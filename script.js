const PASSWORD = "1234"; // change if needed

const content = [
  { image: "day1.jpg", text: "Bday countdown🐭" },
  { image: "day2.jpg", text: "Always makes me smile✨" },
  { 
    type: "scramble",
    scrambled: "FEOFEC",
    answer: "coffee",
    success: "Only thing i love more than you🧋",
    image: "day3.jpg"
  },
  { image: "day4.jpg", text: "Your 1st 'effort'😂" },
  { image: "day5.jpg", text: "Yk you're good at it🎁" },

  {
    type: "qaScramble",
    question: "When was our farewell?",
    scrambled: "20308022",
    answer: "08/02/2023",
    successText: "Then vs Now ⏳",
    image: "day6.jpg"
  },

  { image: "day7.jpg", text: "I love you 🫶🏻" },
  { image: "day8.jpg", text: "We should do this more often 🤓" },

  {
    image: "day9.jpg",
    text: "🎵 This song reminds me of us",
    link: "https://music.apple.com/"
  },

  { image: "day10.jpg", text: "I miss this 🥹" },
  { image: "day11.jpg", text: "Something you NEED to do 💪" },
  { image: "day12.jpg", text: "Our first trip ✨" },

  {
    type: "riddle",
    question: "I’m not a place, but I feel like home.",
    answer: "you",
    successText: "hehehehe 🧁",
    image: "day13.jpg"
  },

  { image: "day14.jpg", text: "Almost there 🍓" },
  { image: "day15.jpg", text: "Budday budday 🧸" },

  {
    birthday: true,
    image: "day16.jpg",
    text: "💘 HAPPY BIRTHDAYYYYYY 💘\nBlow the candle & make a wish(ME🦦)!"
  }
];

/* UNLOCK */
function unlock() {
  console.log("Unlock clicked");
  document.getElementById("login").style.display = "none";
  document.getElementById("calendar").style.display = "grid";
  buildCalendar();
}

/* BUILD CALENDAR */
const today = new Date().getDate(); // change if needed

function buildCalendar() {
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  for (let i = 1; i <= 16; i++) {
    const d = document.createElement("div");
    d.className = "day";
    d.innerText = i;

    if (i > today) {
      d.style.opacity = "0.4";
      d.innerText = "🔒";
      d.onclick = null;
    } else {
      d.onclick = () => openModal(i);
    }

    cal.appendChild(d);
  }
}

/* MODAL */
function openModal(day) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  modal.style.display = "flex";

  const item = content[day - 1];
  modalText.innerHTML = "";

  if (item.type === "birthday") {
  modalText.innerHTML = `
    <img src="${item.image}" style="margin-bottom:15px;">
    <div id="candle" style="font-size:80px; cursor:pointer;">🕯️</div>
    <p style="white-space:pre-line;">${item.text}</p>
    <canvas id="confettiCanvas"
      style="position:fixed; inset:0; pointer-events:none;">
    </canvas>
  `;
  document.getElementById("candle").onclick = blowCandle;
  return;
}

  if (item.type === "riddle") {
    modalText.innerHTML = `
      <p>${item.question}</p>
      <input id="answerInput" placeholder="Your answer">
      <button onclick="checkAnswer('${item.answer}','${item.successText}','${item.image}')">Submit</button>
      <p id="result"></p>
    `;
    return;
  }

  if (item.type === "scramble") {
  modalText.innerHTML = `
    <p>Blah:</p>
    <h2 style="letter-spacing:4px;">${item.scrambled}</h2>
    <input
      id="answer"
      placeholder="Your answer"
      style="
        padding:10px;
        border-radius:6px;
        border:none;
        width:80%;
        text-align:center;
      "
    >
    <br><br>
    <button onclick="checkWithImage('${item.answer}','${item.success}','${item.image}')">
      Submit
    </button>
    <p id="result"></p>
    <img
      id="hiddenImage"
      src="${item.image}"
      style="display:none;margin-top:15px;border-radius:10px;max-width:100%;"
    >
  `;
  return;
}

  let linkHTML = item.link
    ? `<a href="${item.link}" target="_blank">🎵 Open Apple Music</a>`
    : "";

  modalText.innerHTML = `
    <img src="${item.image}">
    <p>${item.text}</p>
    ${linkHTML}
  `;
}

/* ANSWER CHECK */
function checkAnswer(correct, success, image) {
  const input = document.getElementById("answerInput").value.trim().toLowerCase();
  const result = document.getElementById("result");

  if (input === correct) {
    result.innerHTML = `${success}<br><img src="${image}" style="max-width:100%;margin-top:10px">`;
  } else {
    result.innerText = "❌ BYE ❌";
  }
}
function checkWithImage(correct, successText, imagePath) {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  const result = document.getElementById("result");
  const img = document.getElementById("hiddenImage");

  if (input === correct.toLowerCase()) {
    result.innerText = successText;
    img.style.display = "block";
  } else {
    result.innerText = "gdha";
  }
}

/* CLOSE */
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalText").innerHTML = "";
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

  const t = setInterval(() => {
    ctx.clearRect(0, 0, c.width, c.height);
    pieces.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y += p.d, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }, 20);

  setTimeout(() => clearInterval(t), 3000);
  function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 2000);
}
}
