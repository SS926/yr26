const PASSWORD = "1234";

/* UNLOCK */
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
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalText").innerText =
    "Day " + day;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalText").innerHTML = "";
}
