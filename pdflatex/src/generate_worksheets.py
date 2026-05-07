from __future__ import annotations

import argparse
import csv
import shutil
import subprocess
import textwrap
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:  # pragma: no cover - preview generation is optional.
    Image = None
    ImageDraw = None
    ImageFont = None


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
OUTPUT_PDF_DIR = ROOT / "pdf"
OUTPUT_PREVIEW_DIR = ROOT / "preview"
OUTPUT_TEX_DIR = ROOT / "src" / "build"


def latex_escape(value: str) -> str:
    replacements = {
        "\\": r"\textbackslash{}",
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\textasciicircum{}",
    }
    return "".join(replacements.get(ch, ch) for ch in value)


def markdown_to_latex(text: str) -> str:
    lines = [line.rstrip() for line in text.strip().splitlines()]
    chunks: list[str] = []
    bullet_buffer: list[str] = []

    def flush_bullets() -> None:
        if not bullet_buffer:
            return
        items = "\n".join(f"\\item {latex_escape(item)}" for item in bullet_buffer)
        chunks.append(f"\\begin{{itemize}}\n{items}\n\\end{{itemize}}")
        bullet_buffer.clear()

    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            flush_bullets()
            continue
        if line.startswith("- "):
            bullet_buffer.append(line[2:].strip())
            continue
        flush_bullets()
        if line.startswith("### "):
            chunks.append(f"\\subsubsection*{{{latex_escape(line[4:].strip())}}}")
        elif line.startswith("## "):
            chunks.append(f"\\subsection*{{{latex_escape(line[3:].strip())}}}")
        elif line.startswith("# "):
            chunks.append(f"\\section*{{{latex_escape(line[2:].strip())}}}")
        else:
            chunks.append(f"{latex_escape(line)}\n")

    flush_bullets()
    return "\n\n".join(chunks)


def parse_list(value: str) -> list[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


def parse_markdown_config(path: Path) -> dict[str, str]:
    data: dict[str, str] = {}
    current_key: str | None = None
    current_lines: list[str] = []

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        if raw_line.startswith("## "):
            if current_key is not None:
                data[current_key] = "\n".join(current_lines).strip()
            current_key = raw_line[3:].strip().lower().replace(" ", "_")
            current_lines = []
            continue
        if current_key is None:
            continue
        current_lines.append(raw_line)

    if current_key is not None:
        data[current_key] = "\n".join(current_lines).strip()

    return data


@dataclass
class WorksheetConfig:
    title: str
    subtitle: str
    age_group: str
    worksheet_type: str
    instructions: str
    data_file: str
    columns: list[str] = field(default_factory=list)
    answers: bool = False
    show_lines: bool = True
    question_label: str = "Question"

    @classmethod
    def from_markdown(cls, path: Path) -> "WorksheetConfig":
        config = parse_markdown_config(path)
        columns = parse_list(config.get("columns", ""))
        return cls(
            title=config.get("title", "Worksheet"),
            subtitle=config.get("subtitle", ""),
            age_group=config.get("age_group", ""),
            worksheet_type=config.get("worksheet_type", "custom"),
            instructions=config.get("instructions", ""),
            data_file=config.get("data_file", ""),
            columns=columns,
            answers=config.get("answers", "false").strip().lower() == "true",
            show_lines=config.get("show_lines", "true").strip().lower() != "false",
            question_label=config.get("question_label", "Question"),
        )


def read_rows(csv_path: Path) -> list[dict[str, str]]:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def render_math_questions(rows: Iterable[dict[str, str]], show_lines: bool) -> str:
    items: list[str] = []
    for row in rows:
        prompt = row.get("problem", "").strip()
        answer = row.get("answer", "").strip()
        suffix = f" = \\underline{{\\hspace{{1.6cm}}}}" if show_lines else ""
        if answer:
            suffix = f" = {latex_escape(answer)}"
        items.append(f"\\item {latex_escape(prompt)}{suffix}")
    return "\n".join(items)


def render_phonics_questions(
    rows: Iterable[dict[str, str]],
    question_label: str,
    show_lines: bool,
    answers: bool,
) -> str:
    items: list[str] = []
    for row in rows:
        word = row.get("word", "").strip()
        clue = row.get("clue", "").strip()
        rendered_word = latex_escape(word) if answers else r"\underline{\hspace{3.2cm}}"
        line = f"\\textbf{{{latex_escape(question_label)}}}: {latex_escape(clue)}"
        if show_lines:
            line += r"\\[0.15cm]" + rendered_word
        else:
            line += f" {rendered_word}"
        items.append(f"\\item {line}")
    return "\n".join(items)


def render_table(rows: list[dict[str, str]], columns: list[str]) -> str:
    if not columns:
        columns = list(rows[0].keys()) if rows else []
    if not columns:
        return "No worksheet rows were found."

    column_spec = "|".join("p{0.28\\linewidth}" for _ in columns)
    header = " & ".join(f"\\textbf{{{latex_escape(column)}}}" for column in columns)
    body_lines = []
    for row in rows:
        body_lines.append(
            " & ".join(latex_escape(row.get(column, "").strip()) for column in columns) + r" \\ \hline"
        )
    body = "\n".join(body_lines)
    return textwrap.dedent(
        f"""
        \\begin{{tabular}}{{|{column_spec}|}}
        \\hline
        {header} \\\\ \\hline
        {body}
        \\end{{tabular}}
        """
    ).strip()


def build_body(config: WorksheetConfig, rows: list[dict[str, str]]) -> str:
    if config.worksheet_type == "math":
        return "\\begin{enumerate}\n" + render_math_questions(rows, config.show_lines) + "\n\\end{enumerate}"
    if config.worksheet_type == "phonics":
        return (
            "\\begin{enumerate}\n"
            + render_phonics_questions(rows, config.question_label, config.show_lines, config.answers)
            + "\n\\end{enumerate}"
        )
    return render_table(rows, config.columns)


def build_latex(config: WorksheetConfig, body: str) -> str:
    subtitle = []
    if config.subtitle:
        subtitle.append(latex_escape(config.subtitle))
    if config.age_group:
        subtitle.append(f"Age Group: {latex_escape(config.age_group)}")
    subtitle_text = " \\quad | \\quad ".join(subtitle)
    instructions = markdown_to_latex(config.instructions) if config.instructions else ""
    return textwrap.dedent(
        f"""
        \\documentclass[12pt]{{article}}
        \\usepackage[margin=1in]{{geometry}}
        \\usepackage{{enumitem}}
        \\usepackage{{tabularx}}
        \\usepackage{{array}}
        \\usepackage{{longtable}}
        \\usepackage{{fancyhdr}}
        \\usepackage{{lastpage}}
        \\usepackage{{xcolor}}
        \\usepackage{{setspace}}
        \\usepackage{{titlesec}}

        \\pagestyle{{fancy}}
        \\fancyhf{{}}
        \\lhead{{Kids Printable Worksheet}}
        \\rhead{{{latex_escape(config.worksheet_type.title())}}}
        \\cfoot{{Page \\thepage\\ of \\pageref{{LastPage}}}}
        \\setlength{{\\headheight}}{{15pt}}
        \\setstretch{{1.2}}
        \\setlist[enumerate]{{itemsep=1.2em, leftmargin=1.2cm}}
        \\setlist[itemize]{{itemsep=0.5em, leftmargin=1.2cm}}
        \\titleformat{{\\section}}{{\\Large\\bfseries}}{{--}}{{0em}}{{}}

        \\begin{{document}}

        \\begin{{center}}
        {{\\LARGE\\bfseries {latex_escape(config.title)}}} \\\\[0.3cm]
        {{\\large {subtitle_text}}}
        \\end{{center}}

        \\vspace{{0.4cm}}

        {instructions}

        \\vspace{{0.5cm}}

        {body}

        \\vfill
        \\noindent\\textcolor{{gray}}{{Name:\\ \\rule{{5cm}}{{0.4pt}} \\hfill Date:\\ \\rule{{3cm}}{{0.4pt}}}}

        \\end{{document}}
        """
    ).strip() + "\n"


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def run_pdflatex(tex_path: Path, output_dir: Path) -> Path | None:
    pdflatex = shutil.which("pdflatex")
    if not pdflatex:
        return None

    output_dir.mkdir(parents=True, exist_ok=True)
    command = [
        pdflatex,
        "-interaction=nonstopmode",
        f"-output-directory={output_dir}",
        str(tex_path),
    ]
    subprocess.run(command, check=True, cwd=tex_path.parent)
    pdf_path = output_dir / f"{tex_path.stem}.pdf"
    return pdf_path if pdf_path.exists() else None


def build_preview_notice(preview_dir: Path, pdf_path: Path | None) -> None:
    preview_dir.mkdir(parents=True, exist_ok=True)
    message = (
        f"Preview pipeline placeholder.\nPDF generated: {pdf_path}\n"
        if pdf_path
        else "Preview pipeline placeholder.\nInstall pdflatex to enable PDF generation first.\n"
    )
    write_text(preview_dir / "README.txt", message)


def load_font(size: int, bold: bool = False):
    if ImageFont is None:
        return None

    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/calibrib.ttf" if bold else "C:/Windows/Fonts/calibri.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def draw_wrapped_text(draw, text: str, xy: tuple[int, int], font, fill: str, max_width: int, line_gap: int) -> int:
    x, y = xy
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        test = word if not current else f"{current} {word}"
        width = draw.textbbox((0, 0), test, font=font)[2]
        if width <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)

    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        y += font.size + line_gap
    return y


def render_preview_image(config: WorksheetConfig, rows: list[dict[str, str]], markdown_path: Path) -> Path | None:
    if Image is None or ImageDraw is None:
        return None

    preview_path = OUTPUT_PREVIEW_DIR / f"{markdown_path.stem}.png"
    OUTPUT_PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    width, height = 1240, 1754
    margin = 110
    page = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(page)

    title_font = load_font(46, bold=True)
    subtitle_font = load_font(24)
    body_font = load_font(28)
    body_bold = load_font(28, bold=True)
    small_font = load_font(20)

    accent = "#315f8c"
    muted = "#5f6f7a"
    line = "#c9d2dc"

    y = 88
    draw.text((margin, y), config.title, font=title_font, fill="#17212b")
    y += 62
    subtitle_parts = [part for part in [config.subtitle, config.age_group] if part]
    draw.text((margin, y), " | ".join(subtitle_parts), font=subtitle_font, fill=muted)
    y += 52
    draw.line((margin, y, width - margin, y), fill=accent, width=4)
    y += 46

    if config.instructions:
        clean_instructions = []
        for raw_line in config.instructions.splitlines():
            stripped = raw_line.strip()
            if stripped.startswith("#"):
                continue
            if stripped.startswith("- "):
                clean_instructions.append(f"- {stripped[2:]}")
            elif stripped:
                clean_instructions.append(stripped)
        for instruction in clean_instructions:
            y = draw_wrapped_text(draw, instruction, (margin, y), body_font, "#26323d", width - margin * 2, 8)
            y += 8
    y += 24

    if config.worksheet_type == "math":
        for index, row in enumerate(rows, start=1):
            prompt = row.get("problem", "").strip()
            answer = row.get("answer", "").strip()
            draw.text((margin, y), f"{index}.", font=body_bold, fill="#17212b")
            draw.text((margin + 60, y), prompt, font=body_font, fill="#17212b")
            if answer:
                draw.text((margin + 280, y), f"= {answer}", font=body_font, fill="#17212b")
            else:
                draw.text((margin + 280, y), "=", font=body_font, fill="#17212b")
                draw.line((margin + 330, y + 36, margin + 520, y + 36), fill="#17212b", width=3)
            y += 82
    elif config.worksheet_type == "phonics":
        for index, row in enumerate(rows, start=1):
            clue = row.get("clue", "").strip()
            word = row.get("word", "").strip() if config.answers else ""
            draw.text((margin, y), f"{index}.", font=body_bold, fill="#17212b")
            y = draw_wrapped_text(
                draw,
                f"{config.question_label}: {clue}",
                (margin + 60, y),
                body_font,
                "#17212b",
                width - margin * 2 - 60,
                8,
            )
            if word:
                draw.text((margin + 60, y + 8), word, font=body_font, fill="#17212b")
            else:
                draw.line((margin + 60, y + 42, margin + 470, y + 42), fill="#17212b", width=3)
            y += 84
    else:
        for index, row in enumerate(rows, start=1):
            row_text = " | ".join(f"{key}: {value}" for key, value in row.items())
            y = draw_wrapped_text(draw, f"{index}. {row_text}", (margin, y), body_font, "#17212b", width - margin * 2, 8)
            y += 36

    footer_y = height - 130
    draw.line((margin, footer_y, margin + 330, footer_y), fill="#17212b", width=2)
    draw.text((margin, footer_y + 12), "Name", font=small_font, fill=muted)
    draw.line((width - margin - 260, footer_y, width - margin, footer_y), fill="#17212b", width=2)
    draw.text((width - margin - 260, footer_y + 12), "Date", font=small_font, fill=muted)

    page.save(preview_path)
    return preview_path


def generate(markdown_path: Path) -> None:
    config = WorksheetConfig.from_markdown(markdown_path)
    csv_path = DATA_DIR / config.data_file
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV data file not found: {csv_path}")

    rows = read_rows(csv_path)
    body = build_body(config, rows)
    latex = build_latex(config, body)

    OUTPUT_TEX_DIR.mkdir(parents=True, exist_ok=True)
    tex_path = OUTPUT_TEX_DIR / f"{markdown_path.stem}.tex"
    write_text(tex_path, latex)

    pdf_path = run_pdflatex(tex_path, OUTPUT_PDF_DIR)
    preview_path = render_preview_image(config, rows, markdown_path)
    build_preview_notice(OUTPUT_PREVIEW_DIR, pdf_path)

    print(f"Generated LaTeX: {tex_path}")
    if preview_path:
        print(f"Generated preview: {preview_path}")
    if pdf_path:
        print(f"Generated PDF: {pdf_path}")
    else:
        print("pdflatex not found. Install a LaTeX distribution to generate PDFs.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate printable kids worksheets from Markdown and CSV.")
    parser.add_argument("markdown", help="Path to the worksheet markdown config file.")
    args = parser.parse_args()
    generate(Path(args.markdown).resolve())


if __name__ == "__main__":
    main()
