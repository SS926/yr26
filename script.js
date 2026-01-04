const PASSWORD = "1234";

/* ================= CONTENT ================= */
const content = [
  { image: "day1.jpg", text: "Day 1 💕" },
  { image: "day2.jpg", text: "Day 2 ✨" },

  /* ☕ DAY 3 — COFFEE WORD PUZZLE */
  {
    type: "wordPuzzle",
    scrambled: "F E E O F C",
    answer: "coffee",
    successText: "☕ Coffee dates forever 💖",
    image: "day3.jpg"
  },

  { image: "day4.jpg", text: "Day 4 🌸" },
  { image: "day5.jpg", text: "Day 5 🌼" },

  /* 📅 DAY 6 — DATE SCRAMBLE */
  {
    type: "datePuzzle",
    scrambled: "2 0 / 1 4 / 0 2",
    answer: "20/14/02",
    successText: "📅 Some dates change everything 💖",
    image: "day6.jpg"
  },

  { image: "day7.jpg", text: "Day 7 ☁️" },
  { image: "day8.jpg", text: "Day 8 🤍" },

  {
    image: "day9.jpg",
    text: "🎵 This song reminds me of us",
    link: "https://music.apple.com/"
  },

  { image: "day10.jpg", text: "Day 10 🌙" },
  { image: "day11.jpg", text: "Day 11 💪" },
  { image: "day12.jpg", text: "Day 12 ✨" },

  /* 🧩 DAY 13 — RIDDLE */
  {
    type: "riddle",
    question: "I’m not a place, but I feel like home.",
    answer: "you",
    successText: "💗 Always you.",
    image: "day13.jpg"
  },

  { image: "day14.jpg", text: "Day 14 🍓" },
  { image: "day15.jpg", text: "Day 15 🧸" },

  /* 🎂 DAY 16 */
  {
    type: "birthday",
    text: "🎂 HAPPY BIRTHDAY ❤️\nBlow the candle!",
    image: "day16.jpg"
  }
];

/* ================= UNLOCK ================= */
function unlock() {
  const input = document.getElementById("password").value;
  if (input !== PASSWORD) {
    alert("Wrong password");
    return;
  }
  document.getElementById("login").style.display = "none";
  document.getElementById("calendar").style.display = "grid";
  buildCalendar();
}

/* ================= CALENDAR ================= */
function buildCalendar() {
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";
  for (let i = 1; i <= 16; i++) {
    const d = document.createElement("div");
    d.className = "day";
    d.innerText = i;
    d.onclick = () => openModal(i);
    cal.appendChild(d);
  }
}

/* ================= MODAL ================= */
function openModal(day) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  modal.style.display = "flex";

  const item = content[day - 1];
  modalText.innerHTML = "";

  /* 🎂 DAY 16 */
  if (item.type === "birthday") {
    modalText.innerHTML = `
      <img src="${item.image}">
      <div id="candle" style="font-size:80px;cursor:pointer;">🕯️</div>
      <p style="white-space:pre-line;">${item.text}</p>
      <canvas id="confettiCanvas"></canvas>
    `;
    document.getElementById("candle").onclick = () => {
      blowCandle();
      spawnHearts(20);
    };
    return;
  }

  /* ☕ DAY 3 */
  if (item.type === "wordPuzzle") {
    modalText.innerHTML = `
      <h3>☕ Unscramble</h3>
      <h2>${item.scrambled}</h2>
      <input id="puzzleInput">
      <br><br>
      <button onclick="checkWord()">Submit</button>
      <p id="puzzleResult"></p>
    `;
    window.puzzleAnswer = item.answer;
    window.puzzleImage = item.image;
    window.puzzleSuccess = item.successText;
    return;
  }

  /* 📅 DAY 6 */
  if (item.type === "datePuzzle") {
    modalText.innerHTML = `
      <h3>📅 Date Scramble</h3>
      <h2>${item.scrambled}</h2>
      <input id="dateInput" placeholder="DD/MM/YY">
      <br><br>
      <button onclick="checkDatePuzzle()">Submit</button>
      <p id="dateResult"></p>
    `;
    window.dateAnswer = item.answer;
    window.dateImage = item.image;
    window.dateSuccess = item.successText;
    return;
  }

  /* 🧩 DAY 13 */
  if (item.type === "riddle") {
    modalText.innerHTML = `
      <p>${item.question}</p>
      <input id="riddleInput">
      <br><br>
      <button onclick="checkRiddle()">Submit</button>
      <p id="riddleResult"></p>
    `;
    window.riddleAnswer = item.answer;
    window.riddleImage = item.image;
    window.riddleSuccess = item.successText;
    return;
  }

  /* NORMAL DAYS */
  let linkHTML = item.link
    ? `<a href="${item.link}" target="_blank">🎵 Open Apple Music</a>`
    : "";

  modalText.innerHTML = `
    <img src="${item.image}">
    <p>${item.text}</p>
    ${linkHTML}
  `;
}

/* ================= CHECKS ================= */
function checkWord() {
  const v = document.getElementById("puzzleInput").value.toLowerCase();
  const r = document.getElementById("puzzleResult");
  if (v === puzzleAnswer) {
    r.innerHTML = `${puzzleSuccess}<br><img src="${puzzleImage}">`;
    spawnHearts(8);
  } else r.innerText = "❌ Try again";
}

function checkDatePuzzle() {
  const v = document.getElementById("dateInput").value.trim();
  const r = document.getElementById("dateResult");
  if (v === dateAnswer) {
    r.innerHTML = `${dateSuccess}<br><img src="${dateImage}">`;
    spawnHearts(10);
  } else r.innerText = "❌ Try again";
}

function checkRiddle() {
  const v = document.getElementById("riddleInput").value.toLowerCase();
  const r = document.getElementById("riddleResult");
  if (v === riddleAnswer) {
    r.innerHTML = `${riddleSuccess}<br><img src="${riddleImage}">`;
    spawnHearts(10);
  } else r.innerText = "❌ Try again";
}

/* ================= EFFECTS ================= */
function spawnHearts(count = 6) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = "💖";
    h.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2500);
  }
}

function blowCandle() {
  const c = document.getElementById("confettiCanvas");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  const t = setInterval(() => {
    ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
    ctx.beginPath();
    ctx.arc(Math.random()*c.width, Math.random()*c.height, 6, 0, Math.PI*2);
    ctx.fill();
  }, 30);
  setTimeout(() => clearInterval(t), 3000);
}

/* ================= CLOSE ================= */
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalText").innerHTML = "";
}
