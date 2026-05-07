const cards = [
  { stage: "1", section: "Alphabet 字母表", phoneme: "Aa", sound: "letter sound /a/", highlight: "a", words: ["apple", "ant", "alligator"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Bb", sound: "letter sound /b/", highlight: "b", words: ["banana", "ball", "bed"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Cc", sound: "letter sound /k/", highlight: "c", words: ["cat", "cup", "cake"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Dd", sound: "letter sound /d/", highlight: "d", words: ["donut", "dog", "duck"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Ee", sound: "letter sound /e/", highlight: "e", words: ["elephant", "egg", "elf"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Ff", sound: "letter sound /f/", highlight: "f", words: ["fish", "fan", "frog"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Gg", sound: "letter sound /g/", highlight: "g", words: ["gum", "goat", "gift"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Hh", sound: "letter sound /h/", highlight: "h", words: ["heart", "hat", "hen"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Ii", sound: "letter sound /i/", highlight: "i", words: ["igloo", "insect", "ink"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Jj", sound: "letter sound /j/", highlight: "j", words: ["jellyfish", "jam", "jet"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Kk", sound: "letter sound /k/", highlight: "k", words: ["kite", "king", "key"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Ll", sound: "letter sound /l/", highlight: "l", words: ["lion", "leaf", "lamp"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Mm", sound: "letter sound /m/", highlight: "m", words: ["monkey", "map", "moon"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Nn", sound: "letter sound /n/", highlight: "n", words: ["nose", "nest", "net"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Oo", sound: "letter sound /o/", highlight: "o", words: ["octopus", "ox", "ostrich"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Pp", sound: "letter sound /p/", highlight: "p", words: ["pizza", "pig", "pan"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Qq", sound: "letter sound /kw/", highlight: "qu", words: ["queen", "quilt", "quiz"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Rr", sound: "letter sound /r/", highlight: "r", words: ["rainbow", "red", "ring"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Ss", sound: "letter sound /s/", highlight: "s", words: ["star", "sun", "sock"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Tt", sound: "letter sound /t/", highlight: "t", words: ["turtle", "top", "ten"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Uu", sound: "letter sound /u/", highlight: "u", words: ["umbrella", "up", "under"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Vv", sound: "letter sound /v/", highlight: "v", words: ["volcano", "van", "vest"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Ww", sound: "letter sound /w/", highlight: "w", words: ["watermelon", "web", "wind"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Xx", sound: "letter sound /ks/", highlight: "x", words: ["x-ray", "box", "fox"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Yy", sound: "letter sound /y/", highlight: "y", words: ["yo-yo", "yellow", "yak"] },
  { stage: "1", section: "Alphabet 字母表", phoneme: "Zz", sound: "letter sound /z/", highlight: "z", words: ["zebra", "zip", "zoo"] },
  { stage: "1", section: "Vowel 短元音", phoneme: "a", sound: "short /a/", highlight: "a", words: ["hat", "cat", "map"] },
  { stage: "1", section: "Vowel 短元音", phoneme: "e", sound: "short /e/", highlight: "e", words: ["bed", "hen", "pen"] },
  { stage: "1", section: "Vowel 短元音", phoneme: "i", sound: "short /i/", highlight: "i", words: ["pig", "sit", "pin"] },
  { stage: "1", section: "Vowel 短元音", phoneme: "o", sound: "short /o/", highlight: "o", words: ["dog", "box", "hop"] },
  { stage: "1", section: "Vowel 短元音", phoneme: "u", sound: "short /u/", highlight: "u", words: ["bus", "sun", "cup"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "bl", sound: "blend /bl/", highlight: "bl", words: ["block", "black", "blue"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "cl", sound: "blend /cl/", highlight: "cl", words: ["clock", "clap", "clip"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "fl", sound: "blend /fl/", highlight: "fl", words: ["flower", "flag", "flip"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "gl", sound: "blend /gl/", highlight: "gl", words: ["glasses", "glue", "glow"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "pl", sound: "blend /pl/", highlight: "pl", words: ["plug", "plant", "plane"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "sl", sound: "blend /sl/", highlight: "sl", words: ["slide", "sled", "sleep"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "br", sound: "blend /br/", highlight: "br", words: ["bread", "brush", "brick"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "cr", sound: "blend /cr/", highlight: "cr", words: ["crab", "crayon", "crown"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "dr", sound: "blend /dr/", highlight: "dr", words: ["drum", "dress", "dragon"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "fr", sound: "blend /fr/", highlight: "fr", words: ["fries", "frog", "fruit"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "gr", sound: "blend /gr/", highlight: "gr", words: ["grapes", "grass", "green"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "pr", sound: "blend /pr/", highlight: "pr", words: ["pretzel", "prince", "prize"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "tr", sound: "blend /tr/", highlight: "tr", words: ["tree", "train", "truck"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "sc", sound: "blend /sc/", highlight: "sc", words: ["scarf", "scale", "scooter"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "sk", sound: "blend /sk/", highlight: "sk", words: ["skateboard", "skip", "skunk"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "sm", sound: "blend /sm/", highlight: "sm", words: ["small", "smile", "smell"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "sn", sound: "blend /sn/", highlight: "sn", words: ["snake", "snow", "snail"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "sp", sound: "blend /sp/", highlight: "sp", words: ["spider", "spoon", "spin"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "st", sound: "blend /st/", highlight: "st", words: ["star", "stop", "stone"] },
  { stage: "2", section: "Beginning Blends 词首辅音连缀", phoneme: "sw", sound: "blend /sw/", highlight: "sw", words: ["swim", "swan", "sweet"] },
  { stage: "2", section: "Digraph 辅音组合", phoneme: "qu", sound: "/kw/", highlight: "qu", words: ["queen", "quick", "quack"] },
  { stage: "2", section: "Digraph 辅音组合", phoneme: "sh", sound: "/sh/", highlight: "sh", words: ["shark", "ship", "shop"] },
  { stage: "2", section: "Digraph 辅音组合", phoneme: "ch", sound: "/ch/", highlight: "ch", words: ["cheese", "chair", "chick"] },
  { stage: "2", section: "Digraph 辅音组合", phoneme: "wh", sound: "/w/", highlight: "wh", words: ["wheel", "whale", "white"] },
  { stage: "2", section: "Digraph 辅音组合", phoneme: "th", sound: "voiceless /th/", highlight: "th", words: ["thumb", "thin", "three"] },
  { stage: "2", section: "Digraph 辅音组合", phoneme: "th", sound: "voiced /th/", highlight: "th", words: ["this", "then", "they"] },
  { stage: "2", section: "Digraph 辅音组合", phoneme: "ph", sound: "/f/", highlight: "ph", words: ["phone", "photo", "dolphin"] },
  { stage: "2", section: "Digraph 辅音组合", phoneme: "ck", sound: "/k/", highlight: "ck", words: ["sock", "duck", "rock"] },
  { stage: "2", section: "Hard and Soft Sounds 辅音软硬音", phoneme: "c", sound: "hard /k/", highlight: "c", words: ["cat", "cup", "cake"] },
  { stage: "2", section: "Hard and Soft Sounds 辅音软硬音", phoneme: "c", sound: "soft /s/", highlight: "c", words: ["circle", "city", "cent"] },
  { stage: "2", section: "Hard and Soft Sounds 辅音软硬音", phoneme: "g", sound: "hard /g/", highlight: "g", words: ["gum", "goat", "gate"] },
  { stage: "2", section: "Hard and Soft Sounds 辅音软硬音", phoneme: "g", sound: "soft /j/", highlight: "g", words: ["giraffe", "gem", "giant"] },
  { stage: "2", section: "Double Letter Endings 双写辅音结尾", phoneme: "ff", sound: "ending /f/", highlight: "ff", words: ["cliff", "puff", "off"] },
  { stage: "2", section: "Double Letter Endings 双写辅音结尾", phoneme: "ll", sound: "ending /l/", highlight: "ll", words: ["bell", "hill", "shell"] },
  { stage: "2", section: "Double Letter Endings 双写辅音结尾", phoneme: "ss", sound: "ending /s/", highlight: "ss", words: ["kiss", "dress", "glass"] },
  { stage: "2", section: "Double Letter Endings 双写辅音结尾", phoneme: "zz", sound: "ending /z/", highlight: "zz", words: ["buzz", "fizz", "jazz"] },
  { stage: "2", section: "Magic e 长元音魔法 e", phoneme: "a_e", sound: "/ay/", highlight: "a_e", words: ["tape", "cake", "name"] },
  { stage: "2", section: "Magic e 长元音魔法 e", phoneme: "i_e", sound: "/ie/", highlight: "i_e", words: ["pipe", "kite", "bike"] },
  { stage: "2", section: "Magic e 长元音魔法 e", phoneme: "o_e", sound: "/oa/", highlight: "o_e", words: ["cone", "home", "rope"] },
  { stage: "2", section: "Magic e 长元音魔法 e", phoneme: "u_e", sound: "/ue/", highlight: "u_e", words: ["cube", "cute", "mule"] },
  { stage: "2", section: "Vowel 长元音基础", phoneme: "a", sound: "long /a/", highlight: "a", words: ["acorn", "apron", "angel"] },
  { stage: "2", section: "Vowel 长元音基础", phoneme: "e", sound: "long /e/", highlight: "ee", words: ["sheep", "bee", "tree"] },
  { stage: "2", section: "Vowel 长元音基础", phoneme: "i", sound: "long /i/", highlight: "i", words: ["pie", "tie", "fly"] },
  { stage: "2", section: "Vowel 长元音基础", phoneme: "o", sound: "long /o/", highlight: "o", words: ["ghost", "go", "boat"] },
  { stage: "2", section: "Vowel 长元音基础", phoneme: "u", sound: "long /u/", highlight: "u", words: ["unicorn", "music", "unit"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "ai", sound: "/ay/", highlight: "ai", words: ["rain", "snail", "train"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "ay", sound: "/ay/", highlight: "ay", words: ["hay", "day", "play"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "ea", sound: "/ee/", highlight: "ea", words: ["leaf", "read", "beach"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "ee", sound: "/ee/", highlight: "ee", words: ["sleep", "feet", "green"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "ey", sound: "/ay/", highlight: "ey", words: ["turkey", "key", "money"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "ie", sound: "/ie/", highlight: "ie", words: ["tie", "pie", "cried"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "oa", sound: "/oa/", highlight: "oa", words: ["boat", "coat", "soap"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "oe", sound: "/oa/", highlight: "oe", words: ["toe", "doe", "hoe"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "ue", sound: "/ue/", highlight: "ue", words: ["glue", "blue", "clue"] },
  { stage: "3", section: "Vowel Teams 元音组合", phoneme: "ui", sound: "/ue/", highlight: "ui", words: ["juice", "fruit", "suit"] },
  { stage: "3", section: "Bossy R r 控制元音", phoneme: "ar", sound: "/ar/", highlight: "ar", words: ["card", "harp", "star"] },
  { stage: "3", section: "Bossy R r 控制元音", phoneme: "or", sound: "/or/", highlight: "or", words: ["fork", "horse", "corn"] },
  { stage: "3", section: "Bossy R r 控制元音", phoneme: "er", sound: "/er/", highlight: "er", words: ["jersey", "eraser", "her"] },
  { stage: "3", section: "Bossy R r 控制元音", phoneme: "ir", sound: "/er/", highlight: "ir", words: ["stir", "skirt", "bird"] },
  { stage: "3", section: "Bossy R r 控制元音", phoneme: "ur", sound: "/er/", highlight: "ur", words: ["church", "hurt", "turn"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "oo", sound: "/oo/", highlight: "oo", words: ["boot", "moon", "spoon"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "ou", sound: "/ow/", highlight: "ou", words: ["mouth", "cloud", "house"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "oi", sound: "/oy/", highlight: "oi", words: ["coin", "oil", "boil"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "oy", sound: "/oy/", highlight: "oy", words: ["boy", "toy", "joy"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "au", sound: "/aw/", highlight: "au", words: ["caught", "sauce", "August"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "aw", sound: "/aw/", highlight: "aw", words: ["strawberry", "saw", "draw"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "ow", sound: "/ow/", highlight: "ow", words: ["cow", "owl", "brown"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "ew", sound: "/ue/", highlight: "ew", words: ["pew", "new", "chew"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "y", sound: "consonant /y/", highlight: "y", words: ["yellow", "yo-yo", "yak"] },
  { stage: "3", section: "Tricky Vowels 特殊元音", phoneme: "y", sound: "vowel /ie/", highlight: "y", words: ["fly", "sky", "my"] },
];

let currentStage = "all";
let currentIndex = Math.max(0, Math.min(cards.length - 1, Number(new URLSearchParams(window.location.search).get("slide") || 1) - 1));

const stageButtons = document.querySelectorAll(".stage-button");
const stageLabel = document.getElementById("stageLabel");
const sectionLabel = document.getElementById("sectionLabel");
const phonemeText = document.getElementById("phonemeText");
const soundLabel = document.getElementById("soundLabel");
const wordList = document.getElementById("wordList");
const pageCounter = document.getElementById("pageCounter");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const progressDots = document.getElementById("progressDots");
const printButton = document.getElementById("printButton");
const printDeck = document.getElementById("printDeck");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function visibleCards() {
  return currentStage === "all" ? cards : cards.filter((card) => card.stage === currentStage);
}

function highlightMagicE(word, pattern) {
  const first = pattern[0];
  const last = pattern[2];
  const lower = word.toLowerCase();
  const firstIndex = lower.indexOf(first);
  const lastIndex = lower.lastIndexOf(last);
  if (firstIndex === -1 || lastIndex === -1 || firstIndex >= lastIndex) {
    return escapeHtml(word);
  }

  return [
    escapeHtml(word.slice(0, firstIndex)),
    `<mark>${escapeHtml(word[firstIndex])}</mark>`,
    escapeHtml(word.slice(firstIndex + 1, lastIndex)),
    `<mark>${escapeHtml(word[lastIndex])}</mark>`,
    escapeHtml(word.slice(lastIndex + 1)),
  ].join("");
}

function highlightWord(word, highlight) {
  if (highlight.includes("_")) {
    return highlightMagicE(word, highlight);
  }

  const lower = word.toLowerCase();
  const target = highlight.toLowerCase();
  const index = lower.indexOf(target);
  if (index === -1) {
    return escapeHtml(word);
  }

  return [
    escapeHtml(word.slice(0, index)),
    `<mark>${escapeHtml(word.slice(index, index + target.length))}</mark>`,
    escapeHtml(word.slice(index + target.length)),
  ].join("");
}

function renderWordCard(word, highlight, index, print = false) {
  const prefix = print ? "print-" : "";
  const length = Math.max(word.length, 3);
  return `
    <article class="${prefix}word-card">
      <span class="${prefix}word-index">${index + 1}</span>
      <div class="${prefix}word" style="--chars:${length}">${highlightWord(word, highlight)}</div>
    </article>
  `;
}

function renderDots(total) {
  const maxDots = Math.min(total, 24);
  const dots = [];
  for (let i = 0; i < maxDots; i += 1) {
    const mappedIndex = Math.floor((i / Math.max(maxDots - 1, 1)) * Math.max(total - 1, 0));
    dots.push(`<span class="dot ${Math.abs(mappedIndex - currentIndex) <= 1 ? "active" : ""}"></span>`);
  }
  progressDots.innerHTML = dots.join("");
}

function render() {
  const list = visibleCards();
  const card = list[currentIndex];
  stageLabel.textContent = `阶段 ${card.stage}`;
  sectionLabel.textContent = card.section;
  phonemeText.textContent = card.phoneme;
  soundLabel.textContent = card.sound;
  pageCounter.textContent = `${currentIndex + 1} / ${list.length}`;
  wordList.innerHTML = card.words.map((word, index) => renderWordCard(word, card.highlight, index)).join("");
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === list.length - 1;
  renderDots(list.length);
}

function renderPrintDeck() {
  printDeck.innerHTML = cards.map((card, index) => `
    <article class="print-slide">
      <aside class="print-phoneme">
        <p class="print-stage">阶段 ${escapeHtml(card.stage)}</p>
        <p class="print-section">${escapeHtml(card.section)}</p>
        <div class="print-phoneme-text">${escapeHtml(card.phoneme)}</div>
        <p class="print-sound">${escapeHtml(card.sound)}</p>
      </aside>
      <section class="print-words">
        <div class="print-header">
          <span>三个例词</span>
          <span>${index + 1} / ${cards.length}</span>
        </div>
        <div class="print-word-list">
          ${card.words.map((word, wordIndex) => renderWordCard(word, card.highlight, wordIndex, true)).join("")}
        </div>
      </section>
    </article>
  `).join("");
}

stageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stageButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    currentStage = button.dataset.stage;
    currentIndex = 0;
    render();
  });
});

prevButton.addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 1);
  render();
});

nextButton.addEventListener("click", () => {
  currentIndex = Math.min(visibleCards().length - 1, currentIndex + 1);
  render();
});

printButton.addEventListener("click", () => {
  renderPrintDeck();
  window.print();
});

window.addEventListener("beforeprint", renderPrintDeck);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    prevButton.click();
  }
  if (event.key === "ArrowRight") {
    nextButton.click();
  }
});

window.PHONICS_CARDS = cards;
renderPrintDeck();
render();
