const PASSWORD = "1234";

/* CONTENT */
const content = [
  { image: "day1.jpg", text: "Birthday countdown 🐭" },
  { image: "day2.jpg", text: "This always makes me smile🫠" },

  // ☕ DAY 3 — COFFEE WORD PUZZLE
  {
    type: "wordPuzzle",
    scrambled: "F E E O F C",
    answer: "coffee",
    successText: "Only thing i love more than you🧋",
    image: "day3.jpg"
  },

  { image: "day4.jpg", text: "Your first 'effort'😂" },
  { image: "day5.jpg", text: "Something yk you’re good at🎁" },
  {
  type: "qaSramble",
  question: "When was our farewell?",
  scrambled: "02308202",
  answer: "08/02/2023",
  successText: "Then vs now⏳",
  image: "day6.jpg"
},
  { image: "day7.jpg", text: "I love you🫶🏻" },
  { image: "day8.jpg", text: "We should do this more often🤓" },

  {
    image: "day9.jpg",
    text: "🎶 This song reminds me of us",
    link: "https://music.apple.com/in/album/my-love-mine-all-mine/1697335341?i=1697335814"
  },

  { image: "day10.jpg", text: "I miss this🦫" },
  { image: "day11.jpg", text: "Something you NEED to do💪🏽" },
  { image: "day12.jpg", text: "Our first trip✨" },
  {
    type: "riddle",
    question: "🧩 I’m not a place, but I feel like home.",
    answer: "you",
    successText: "HEHEHEHE🧁",
    image: "day13.jpg"
  },

  { image: "day14.jpg", text: "Almost there 🍓" },
  { image: "day15.jpg", text: "Budday budday 🧸" },

  // 🎂 DAY 16 — BIRTHDAY
  {
    type: "birthday",
    text: "🎂 HAPPY BIRTHDAYYYYY 🎂\nBlow the candle & make a wish(ME)🦦",
    image: "day16.jpg"
  }
];

/* UNLOCK */
function unlock() {
  if (document.getElementById("password").value !== PASSWORD) return;
  document.getElementById("login").style.display = "none";
  document.getElementById("calendar").style.display = "grid";
  buildCalendar();
}

/* BUILD CALENDAR */
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

/* MODAL */
function openModal(day) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  modal.style.display = "flex";

  const item = content[day - 1];
  if (!item) {
    modalText.innerHTML = "<p>No content</p>";
    return;
  }

  // 🎂 DAY 16
  if (item.type === "birthday") {
    modalText.innerHTML = `
      <div id="candle" style="font-size:80px;cursor:pointer;">🕯️</div>
      <p>${item.text}</p>
      <img src="${item.image}">
      <canvas id="confettiCanvas"></canvas>
    `;
    document.getElementById("candle").onclick = blowcandle;
  return;
}

  // ☕ DAY 3 WORD PUZZLE
  if (item.type === "wordPuzzle") {
    modalText.innerHTML = `
      <p>🔀 ${item.scrambled}</p>
      <input id="puzzleInput" placeholder="Your answer">
      <br><br>
      <button onclick="checkWord()">Submit</button>
      <p id="puzzleResult"></p>
    `;
    window.puzzleAnswer = item.answer;
    window.puzzleImage = item.image;
    window.puzzleSuccess = item.successText;
    return;
  }
    /* 📅 DAY 6 — DATE SCRAMBLE */
if (item.type === "datePuzzle") {
  modalText.innerHTML = `
    <h3>📅 Date Scramble</h3>
    <p>Unscramble the date:</p>

    <h2>${item.scrambled}</h2>

    <input
      id="dateInput"
      placeholder="DD/MM/YY"
      style="padding:10px;border-radius:6px;border:none;width:80%;text-align:center;"
    >

    <br><br>
    <button onclick="checkDatePuzzle()">Submit</button>

    <p id="dateResult"></p>
  `;

  window.dateAnswer = item.answer;
  window.dateImage = item.image;
  window.dateSuccess = item.successText;
  return;
}

  // 🧩 DAY 13 RIDDLE
  if (item.type === "riddle") {
    modalText.innerHTML = `
      <p>${item.question}</p>
      <input id="riddleInput" placeholder="Answer">
      <br><br>
      <button onclick="checkRiddle()">Submit</button>
      <p id="riddleResult"></p>
    `;
    window.riddleAnswer = item.answer;
    window.riddleImage = item.image;
    window.riddleSuccess = item.successText;
    return;
  }

  // 🎵 MUSIC DAY
  let linkHTML = item.link
    ? `<a href="${item.link}" target="_blank">🎵 Open in Apple Music</a>`
    : "";

  modalText.innerHTML = `
    <img src="${item.image}">
    <p>${item.text}</p>
    ${linkHTML}
  `;
}

/* CLOSE */
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalText").innerHTML = "";
}

/* CHECK WORD PUZZLE */
function checkWord() {
  const val = document.getElementById("puzzleInput").value.toLowerCase();
  const res = document.getElementById("puzzleResult");

  if (val === puzzleAnswer) {
    res.innerHTML = `${puzzleSuccess}<br><img src="${puzzleImage}">`;
  } else {
    res.innerText = "❌ BYE ❌";
  }
}
  function checkDatePuzzle() {
  const input = document.getElementById("dateInput").value.trim();
  const res = document.getElementById("dateResult");

  if (input === dateAnswer) {
    res.innerHTML = `${dateSuccess}<br><img src="${dateImage}">`;
  } else {
    res.innerText = "YOU DONT LOVE ME ANYMORE🔪";
  }
}

/* CHECK RIDDLE */
function checkRiddle() {
  const val = document.getElementById("riddleInput").value.toLowerCase();
  const res = document.getElementById("riddleResult");

  if (val === riddleAnswer) {
    res.innerHTML = `${riddleSuccess}<br><img src="${riddleImage}">`;
  } else {
    res.innerText = "Blablabla";
  }
}

/* CONFETTI */
function blowCandle() {
  const c = document.getElementById("confettiCanvas");
  const ctx = c.getContext("2d");
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 4 + 2,
    color: `hsl(${Math.random() * 360},100%,60%)`
  }));

  let t = setInterval(() => {
    ctx.clearRect(0,0,c.width,c.height);
    pieces.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y += p.d, p.r, 0, Math.PI*2);
      ctx.fill();
    });
  }, 20);

  setTimeout(() => clearInterval(t), 3000);
}
