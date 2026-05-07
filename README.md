# OneTeacher Lesson Builder

中文 | [English](#english)

## 中文

`OneTeacher Lesson Builder` 是一个面向小学英语教学内容制作的项目集合，主要用于快速生成和展示教学课件、拼读卡片、可打印练习页与导入式课堂页面。

这个仓库目前包含三类核心能力：

- `phonics-card-web/`
  一个可直接在浏览器打开的五环节英语教学页生成器。
  支持导入 `Markdown (.md)` 和 `Excel (.xlsx)` 文件，并严格按照以下五环节组织页面内容：
  `热身 (Warm up) -> 词汇 (Vocabulary) -> 句型 (Sentence) -> 技巧 (Skill) -> 检测 (Wrap up)`

- `pdflatex/`
  一个基于 Python + LaTeX 的儿童练习页生成器。
  可根据 Markdown 配置和 CSV 数据生成 `.tex` 文件，并在本机安装 `pdflatex` 时继续输出 PDF。

- `phonics-card-web2/` 与 `phonics-ppt-deck/`
  早期或实验性页面版本，用于拼读展示、分页导出和视觉验证。

## 功能特点

- 支持课堂内容导入，适合快速生成教学展示页
- 支持五环节结构化教学设计
- 支持儿童英语词汇、句型、听力与发音技巧内容编排
- 支持本地模板文件下载与复用
- 支持静态网页本地打开，无需部署即可预览
- 支持 Python 生成可打印练习页

## 项目结构

```text
.
├─ phonics-card-web/       # 主网页课件生成器
│  ├─ templates/           # Markdown / Excel 模板
│  ├─ app.js               # 页面逻辑与导入解析
│  ├─ styles.css           # 页面样式
│  ├─ index.html           # 入口页面
│  └─ xlsx.full.min.js     # 本地 Excel 解析库
├─ pdflatex/               # Python + LaTeX worksheet 生成器
│  ├─ data/                # CSV 数据
│  ├─ src/                 # Python 脚本与 Markdown 配置
│  └─ preview/             # 本地预览说明
├─ phonics-card-web2/      # 实验版本
├─ phonics-ppt-deck/       # 实验版本
└─ .gitignore
```

## 如何使用

### 1. 打开网页课件生成器

直接打开：

`phonics-card-web/index.html`

然后你可以：

- 点击“导入课程文件”
- 导入 `lesson-template.md` 或 `lesson-template.xlsx`
- 浏览自动生成的五环节教学页面
- 使用上一页 / 下一页进行翻页
- 使用打印按钮输出页面

模板文件位置：

- [Markdown 模板](./phonics-card-web/templates/lesson-template.md)
- [Excel 模板](./phonics-card-web/templates/lesson-template.xlsx)

### 2. 生成可打印练习页

在 `pdflatex/` 目录中运行：

```powershell
python .\pdflatex\src\generate_worksheets.py .\pdflatex\src\example_math.md
python .\pdflatex\src\generate_worksheets.py .\pdflatex\src\example_phonics.md
```

如果系统中安装了 `pdflatex`，脚本会进一步生成 PDF。

## 导入格式说明

网页生成器支持：

- `Markdown (.md)`
- `Excel (.xlsx)`

推荐优先使用模板文件。

Markdown 导入建议使用如下结构：

```md
## lesson_title
Lesson 1: Hello and My Body

## lesson_subtitle
围绕打招呼、身体部位和基础自我介绍开展课堂。

## song
Hello Song
```

Excel 导入建议使用以下字段：

- `lesson_title`
- `lesson_subtitle`
- `song`
- `warm_up_commands`
- `vocabulary`
- `phrases`
- `sentences`
- `skill_focus`
- `listening_dialogue`
- `listening_questions`
- `wrap_up_tasks`

## 当前状态

这个仓库目前以本地可用、快速迭代为主，适合作为：

- 小学英语教学素材制作工具
- 拼读教学展示页原型
- 可打印 worksheet 生成工具
- 课堂课件生成器原型

后续可以继续扩展：

- 自动导出 PDF / PPT
- 批量课程导入
- 更多教学模板
- 更稳定的多语言与编码处理

---

## English

`OneTeacher Lesson Builder` is a small project collection for creating elementary English teaching materials, including interactive lesson pages, phonics cards, and printable worksheets.

It currently includes three main parts:

- `phonics-card-web/`
  A browser-based five-step lesson page builder.
  It supports importing `Markdown (.md)` and `Excel (.xlsx)` files and organizes content into the following fixed teaching flow:
  `Warm up -> Vocabulary -> Sentence -> Skill -> Wrap up`

- `pdflatex/`
  A Python + LaTeX worksheet generator for printable classroom materials.
  It reads Markdown configuration and CSV data, generates `.tex` files, and can also generate PDFs when `pdflatex` is installed locally.

- `phonics-card-web2/` and `phonics-ppt-deck/`
  Earlier or experimental versions for phonics presentation and page export experiments.

## Features

- Import-based lesson content workflow
- Fixed five-step teaching structure for elementary English lessons
- Support for vocabulary, sentence patterns, listening tasks, and pronunciation tips
- Reusable local templates
- Static HTML workflow that can be opened directly in a browser
- Python-based printable worksheet generation

## Project Layout

```text
.
├─ phonics-card-web/       # main lesson page builder
│  ├─ templates/           # Markdown / Excel templates
│  ├─ app.js               # lesson rendering and import logic
│  ├─ styles.css           # page styling
│  ├─ index.html           # main entry
│  └─ xlsx.full.min.js     # local Excel parser
├─ pdflatex/               # Python + LaTeX worksheet generator
│  ├─ data/                # CSV data
│  ├─ src/                 # Python scripts and Markdown configs
│  └─ preview/             # local preview notes
├─ phonics-card-web2/      # experimental version
├─ phonics-ppt-deck/       # experimental version
└─ .gitignore
```

## How To Use

### 1. Open the lesson page builder

Open this file directly in your browser:

`phonics-card-web/index.html`

Then you can:

- click `Import lesson file`
- import `lesson-template.md` or `lesson-template.xlsx`
- browse the generated five-step lesson pages
- move through the pages with previous / next controls
- print the current lesson layout

Template files:

- [Markdown template](./phonics-card-web/templates/lesson-template.md)
- [Excel template](./phonics-card-web/templates/lesson-template.xlsx)

### 2. Generate printable worksheets

Run the following commands:

```powershell
python .\pdflatex\src\generate_worksheets.py .\pdflatex\src\example_math.md
python .\pdflatex\src\generate_worksheets.py .\pdflatex\src\example_phonics.md
```

If `pdflatex` is installed, the script can also generate PDF output.

## Import Format

The lesson page builder supports:

- `Markdown (.md)`
- `Excel (.xlsx)`

Using the provided templates is recommended.

Suggested Markdown format:

```md
## lesson_title
Lesson 1: Hello and My Body

## lesson_subtitle
A beginner lesson about greetings, body parts, and self-introduction.

## song
Hello Song
```

Suggested Excel fields:

- `lesson_title`
- `lesson_subtitle`
- `song`
- `warm_up_commands`
- `vocabulary`
- `phrases`
- `sentences`
- `skill_focus`
- `listening_dialogue`
- `listening_questions`
- `wrap_up_tasks`

## Status

This repository is currently focused on local usability and rapid iteration. It works well as:

- a teaching material builder
- a phonics lesson prototype
- a printable worksheet generator
- a lightweight classroom page builder

Possible future improvements:

- PDF / PPT export
- batch lesson import
- more teaching templates
- more robust multilingual and encoding support
