# Printable Kids Worksheets

This project generates printable kids worksheets from Markdown and CSV data.

## Structure

- `src/` - Python script, Markdown worksheet definitions, and generated `.tex` files
- `pdf/` - PDF output when `pdflatex` is installed
- `data/` - CSV question banks
- `preview/` - preview placeholder output

## Usage

```powershell
python .\src\generate_worksheets.py .\src\example_math.md
python .\src\generate_worksheets.py .\src\example_phonics.md
```

If `pdflatex` is available in `PATH`, the script will also compile the generated `.tex` file into `pdf/`.
