const STEP_ORDER = [
  { key: "warmup", label: "热身 Warm up", short: "热身" },
  { key: "vocabulary", label: "词汇 Vocabulary", short: "词汇" },
  { key: "sentence", label: "句型 Sentence", short: "句型" },
  { key: "skill", label: "技巧 Skill", short: "技巧" },
  { key: "wrapup", label: "检测 Wrap up", short: "检测" },
];

const DEFAULT_LESSON = {
  lesson_title: "Lesson 1: Hello and My Body",
  lesson_subtitle: "围绕打招呼、身体部位和基础自我介绍开展课堂。",
  song: "Hello Song",
  warm_up_commands: [
    "Touch your eye.",
    "Touch your mouth.",
    "Touch your ear.",
    "Wave and say hello.",
  ],
  vocabulary: [
    "eye | big round eye | Point to your eye and say eye.",
    "ear | little ear | Touch your ear gently.",
    "mouth | smiling mouth | Open your mouth and say ah.",
    "toy | favorite toy | Hold up a toy and say toy.",
  ],
  phrases: [
    "say hello",
    "my name is",
    "nice to meet you",
  ],
  sentences: [
    "Hello! I'm Mike Black. | 你好！我是 Mike Black. | greeting",
    "Hi! My name is Wu Binbin. | 嗨！我的名字是 Wu Binbin. | self-introduction",
    "Nice to meet you. | 很高兴见到你。 | friendly response",
    "Nice to meet you, too. | 我也很高兴见到你。 | reply",
  ],
  skill_focus: [
    "share | Place the tongue lightly behind the teeth, then let the sound flow out clearly.",
    "nice to meet you | Keep the pace smooth and smile while speaking the whole sentence.",
  ],
  listening_dialogue: [
    "A: Hi! My name is Lily.",
    "B: Hello! I'm Tom. Nice to meet you.",
    "A: Nice to meet you, too.",
  ],
  listening_questions: [
    "What's the boy's name?",
    "Who says hello first?",
  ],
  wrap_up_tasks: [
    "Write the word for the picture of an eye.",
    "Fill in: Hello! I'm ____.",
    "Choose is or are: My name ____ Ben.",
    "Listen again and answer: What's the boy's name?",
  ],
};

let lesson = normalizeLesson(DEFAULT_LESSON);
let pages = buildPages(lesson);
let currentIndex = 0;

const lessonTitle = document.getElementById("lessonTitle");
const importStatus = document.getElementById("importStatus");
const stepTabs = document.querySelector(".step-tabs");
const stepLabel = document.getElementById("stepLabel");
const pageTitle = document.getElementById("pageTitle");
const pageLead = document.getElementById("pageLead");
const leftHighlights = document.getElementById("leftHighlights");
const pageMeta = document.getElementById("pageMeta");
const pageCounter = document.getElementById("pageCounter");
const contentGrid = document.getElementById("contentGrid");
const progressDots = document.getElementById("progressDots");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const printButton = document.getElementById("printButton");
const lessonFile = document.getElementById("lessonFile");

function chunk(items, size) {
  const output = [];
  for (let i = 0; i < items.length; i += size) {
    output.push(items.slice(i, i + size));
  }
  return output;
}

function splitList(text) {
  return text
    .split(/\r?\n|\|\|/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseVocabularyItem(item) {
  const [word = "", hint = "", action = ""] = item.split("|").map((part) => part.trim());
  return { word, hint, action };
}

function parseSentenceItem(item) {
  const [english = "", chinese = "", note = ""] = item.split("|").map((part) => part.trim());
  return { english, chinese, note };
}

function parseSkillItem(item) {
  const [focus = "", tip = ""] = item.split("|").map((part) => part.trim());
  return { focus, tip };
}

function normalizeLesson(raw) {
  return {
    lesson_title: raw.lesson_title || "My English Lesson",
    lesson_subtitle: raw.lesson_subtitle || "导入你自己的词汇、短语和句子，自动生成五环节教学页面。",
    song: raw.song || "Hello Song",
    warm_up_commands: Array.isArray(raw.warm_up_commands) ? raw.warm_up_commands : splitList(raw.warm_up_commands || ""),
    vocabulary: (Array.isArray(raw.vocabulary) ? raw.vocabulary : splitList(raw.vocabulary || "")).map(parseVocabularyItem),
    phrases: Array.isArray(raw.phrases) ? raw.phrases : splitList(raw.phrases || ""),
    sentences: (Array.isArray(raw.sentences) ? raw.sentences : splitList(raw.sentences || "")).map(parseSentenceItem),
    skill_focus: (Array.isArray(raw.skill_focus) ? raw.skill_focus : splitList(raw.skill_focus || "")).map(parseSkillItem),
    listening_dialogue: Array.isArray(raw.listening_dialogue) ? raw.listening_dialogue : splitList(raw.listening_dialogue || ""),
    listening_questions: Array.isArray(raw.listening_questions) ? raw.listening_questions : splitList(raw.listening_questions || ""),
    wrap_up_tasks: Array.isArray(raw.wrap_up_tasks) ? raw.wrap_up_tasks : splitList(raw.wrap_up_tasks || ""),
  };
}

function buildPages(currentLesson) {
  const pagesList = [];
  const vocabChunks = chunk(currentLesson.vocabulary, 4);
  const sentenceChunks = chunk(currentLesson.sentences, 4);

  pagesList.push({
    step: "warmup",
    title: "让课堂先热起来",
    lead: "先用歌曲和动作调动情绪，让孩子在轻松、熟悉、能参与的节奏里进入英文课堂。",
    meta: "歌曲导入 + TPR 活动",
    highlights: [
      { title: "歌曲导入", text: `播放 ${currentLesson.song}，让学生边唱边做动作。` },
      { title: "课堂目标", text: "先开口、先动作、先开心，再进入词汇和句型。" },
    ],
    cards: [
      {
        title: "Warm up Song",
        body: `播放《${currentLesson.song}》，PPT 上配可爱卡通人物跳舞，带着学生一起唱 hello、wave、smile。`,
        meta: "建议先完整播放 1 次，再分句跟唱 1 次。",
      },
      {
        title: "TPR 指令游戏",
        body: currentLesson.warm_up_commands.join("  "),
        meta: "老师说指令，学生做动作；动作和语言同步，理解更快。",
      },
    ],
  });

  vocabChunks.forEach((items, index) => {
    pagesList.push({
      step: "vocabulary",
      title: index === 0 ? "词汇呈现与跟读" : `词汇拓展 ${index + 1}`,
      lead: "每页保留少量词，方便低年级学生看图、开口、记音、做动作。",
      meta: `词汇卡片 ${index + 1} / ${vocabChunks.length}`,
      highlights: [
        { title: "教学节奏", text: "看图说词 -> 老师领读 -> 学生齐读 -> 单人挑战。" },
        { title: "小游戏", text: "可以接上单词大接龙，鼓励学生用首字母继续说词。" },
      ],
      cards: items.map((item) => ({
        title: item.word,
        body: item.hint || "配一张清晰可爱的图片来帮助理解。",
        meta: item.action || "点击图片可做轻微动画或播放单词读音。",
      })),
    });
  });

  sentenceChunks.forEach((items, index) => {
    pagesList.push({
      step: "sentence",
      title: index === 0 ? "重点句型与对话" : `句型练习 ${index + 1}`,
      lead: "关键词做颜色强调，搭配卡通人物对话图，帮助学生把句子放进真实情境里。",
      meta: `句型页 ${index + 1} / ${sentenceChunks.length}`,
      highlights: [
        { title: "核心表达", text: currentLesson.phrases.join(" / ") || "hello / my name is / nice to meet you" },
        { title: "课堂组织", text: "先跟读，再两人一组开口模仿，最后请小组上台展示。" },
      ],
      cards: items.map((item, cardIndex) => ({
        title: item.english,
        body: item.chinese || "给孩子一个清楚的中文理解锚点。",
        meta: item.note || `示例对话 ${cardIndex + 1}`,
      })),
    });
  });

  pagesList.push({
    step: "skill",
    title: "听力与口语技巧",
    lead: "技巧页不追求复杂，而是把“怎么听、怎么说”讲得直接、可模仿、可马上练习。",
    meta: "关键词抓取 + 发音指导",
    highlights: [
      { title: "听力技巧", text: "先听名字、问候语和关键词，再回答问题。" },
      { title: "口语技巧", text: "难词拆开练，句子整句读，鼓励孩子大胆开口。" },
    ],
    cards: [
      {
        title: "Listening Dialogue",
        body: currentLesson.listening_dialogue.join("  "),
        meta: currentLesson.listening_questions.length
          ? `思考问题：${currentLesson.listening_questions.join(" / ")}`
          : "先听一遍，再圈出关键词。",
      },
      ...currentLesson.skill_focus.map((item) => ({
        title: item.focus,
        body: item.tip,
        meta: "可以搭配口型图、手势提示和慢速示范。",
      })),
    ],
  });

  pagesList.push({
    step: "wrapup",
    title: "课堂检测与收束",
    lead: "检测页把词汇、句型和听力收回来，让学生在短时间内完成回顾、判断和填空。",
    meta: "词汇检测 + 句型检测 + 听力检测",
    highlights: [
      { title: "词汇检测", text: "看图写词，或给单词选图片。" },
      { title: "句型检测", text: "用填空和替换练习帮助学生巩固句型结构。" },
    ],
    cards: currentLesson.wrap_up_tasks.map((item, index) => ({
      title: `Task ${index + 1}`,
      body: item,
      meta: "可以让学生口答、板演或小组合作完成。",
    })),
  });

  return pagesList;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function renderStepTabs() {
  const currentStep = pages[currentIndex].step;
  stepTabs.innerHTML = STEP_ORDER.map((step) => `
    <button class="step-button ${step.key === currentStep ? "active" : ""}" type="button" data-step="${step.key}">
      ${step.short}
    </button>
  `).join("");

  stepTabs.querySelectorAll(".step-button").forEach((button) => {
    button.addEventListener("click", () => {
      const targetIndex = pages.findIndex((page) => page.step === button.dataset.step);
      if (targetIndex >= 0) {
        currentIndex = targetIndex;
        render();
      }
    });
  });
}

function renderDots() {
  progressDots.innerHTML = pages.map((_, index) => `
    <span class="dot ${index === currentIndex ? "active" : ""}"></span>
  `).join("");
}

function renderCard(card) {
  const body = card.body.includes("A:")
    ? card.body.split(/\s{2,}/).map((line) => {
        const tag = line.startsWith("A:") ? "A" : line.startsWith("B:") ? "B" : "*";
        const text = line.replace(/^[A-Z*]:\s*/, "");
        return `
          <div class="dialogue-line">
            <span class="dialogue-tag">${escapeHtml(tag)}</span>
            <p>${escapeHtml(text)}</p>
          </div>
        `;
      }).join("")
    : `<p>${escapeHtml(card.body)}</p>`;

  return `
    <article class="content-card">
      <h3>${escapeHtml(card.title)}</h3>
      ${body}
      <p class="meta">${escapeHtml(card.meta || "")}</p>
    </article>
  `;
}

function render() {
  const page = pages[currentIndex];
  lessonTitle.textContent = `${lesson.lesson_title} · ${lesson.lesson_subtitle}`;
  stepLabel.textContent = STEP_ORDER.find((step) => step.key === page.step).label;
  pageTitle.textContent = page.title;
  pageLead.textContent = page.lead;
  pageMeta.textContent = page.meta;
  pageCounter.textContent = `${currentIndex + 1} / ${pages.length}`;
  leftHighlights.innerHTML = page.highlights.map((item) => `
    <article class="highlight-card">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.text)}</span>
    </article>
  `).join("");
  contentGrid.innerHTML = page.cards.map(renderCard).join("");
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === pages.length - 1;
  renderStepTabs();
  renderDots();
}

function parseMarkdownConfig(text) {
  const cleanedText = text.replace(/^\uFEFF/, "");
  const result = {};
  let currentKey = null;
  let lines = [];
  let foundSections = false;

  cleanedText.split(/\r?\n/).forEach((rawLine) => {
    const trimmedLine = rawLine.trim();
    if (trimmedLine.startsWith("## ")) {
      if (currentKey) {
        result[currentKey] = lines.join("\n").trim();
      }
      currentKey = trimmedLine.slice(3).trim().toLowerCase();
      lines = [];
      foundSections = true;
      return;
    }
    if (currentKey) {
      lines.push(rawLine);
    }
  });

  if (currentKey) {
    result[currentKey] = lines.join("\n").trim();
  }

  if (foundSections) {
    return result;
  }

  cleanedText.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      return;
    }

    const match = line.match(/^([A-Za-z_]+)\s*[:：]\s*(.+)$/);
    if (match) {
      result[match[1].trim().toLowerCase()] = match[2].trim();
    }
  });

  return result;
}

function validateLesson(rawLesson) {
  const requiredFields = [
    "lesson_title",
    "warm_up_commands",
    "vocabulary",
    "sentences",
    "skill_focus",
    "wrap_up_tasks",
  ];

  const missingFields = requiredFields.filter((field) => {
    const value = rawLesson[field];
    return !value || String(value).trim() === "";
  });

  if (missingFields.length > 0) {
    throw new Error(`导入成功读取到文件，但缺少必要字段：${missingFields.join(", ")}`);
  }
}

function parseWorkbook(fileBuffer) {
  const workbook = XLSX.read(fileBuffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  const mapped = {};

  rows.forEach((row) => {
    const field = String(row.field || row.Field || "").trim().toLowerCase();
    const value = String(row.value || row.Value || "").trim();
    if (field) {
      mapped[field] = value;
    }
  });

  return mapped;
}

async function loadLessonFromFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (extension === "md" || extension === "markdown") {
    const text = await file.text();
    const parsed = parseMarkdownConfig(text);
    validateLesson(parsed);
    return normalizeLesson(parsed);
  }
  if (extension === "xlsx") {
    const buffer = await file.arrayBuffer();
    const parsed = parseWorkbook(buffer);
    validateLesson(parsed);
    return normalizeLesson(parsed);
  }
  throw new Error("仅支持 .md 或 .xlsx 文件。");
}

lessonFile.addEventListener("change", async (event) => {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  try {
    lesson = await loadLessonFromFile(file);
    pages = buildPages(lesson);
    currentIndex = 0;
    importStatus.textContent = `已导入：${file.name}`;
    render();
  } catch (error) {
    window.alert(error.message || "文件读取失败，请检查模板格式。");
    importStatus.textContent = "导入失败，请检查模板字段";
  } finally {
    lessonFile.value = "";
  }
});

prevButton.addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 1);
  render();
});

nextButton.addEventListener("click", () => {
  currentIndex = Math.min(pages.length - 1, currentIndex + 1);
  render();
});

printButton.addEventListener("click", () => {
  window.print();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    prevButton.click();
  }
  if (event.key === "ArrowRight") {
    nextButton.click();
  }
});

render();
