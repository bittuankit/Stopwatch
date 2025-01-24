const time = document.querySelector(".time");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapContainer = document.querySelector(".lap-container");

let timer = 0;
let start = 0;
let elapsed = 0;
let isRunning = false;
let hours = 0;

startBtn.addEventListener("click", () => {
  startBtn.textContent === "Start" ? startTime() : stopTime();
});

const startTime = () => {
  startBtn.textContent = "Stop";
  if (!isRunning) {
    start = Date.now() - elapsed;
    timer = setInterval(updateTime, 10);
    isRunning = true;
  }
};

const stopTime = () => {
  startBtn.textContent = "Start";
  if (isRunning) {
    clearInterval(timer);
    elapsed = Date.now() - start;
    isRunning = false;
  }
};

resetBtn.addEventListener("click", () => {
  startBtn.textContent = "Start";
  clearInterval(timer);
  start = 0;
  elapsed = 0;
  isRunning = false;
  time.textContent = "00:00:00:00";
});

const updateTime = () => {
  const currentTime = Date.now();
  elapsed = currentTime - start;

  hours = String(Math.floor(elapsed / (1000 * 60 * 60))).padStart(2, "0");
  minutes = String(Math.floor((elapsed / (1000 * 60)) % 60)).padStart(2, "0");
  seconds = String(Math.floor((elapsed / 1000) % 60)).padStart(2, "0");
  millisecond = String(Math.floor((elapsed % 1000) / 10)).padStart(2, "0");

  hours = time.textContent = `${hours}:${minutes}:${seconds}:${millisecond}`;
};

lapBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  const innerDivHtml = `<div class="laps">
            <div class="lap">${hours}</div>
            <i class="fa-solid fa-trash"></i>
        </div>`;
  div.innerHTML = innerDivHtml;
  lapContainer.append(div);
});

lapContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    const timeLap = e.target.parentNode;
    timeLap.style.display = "none";
  }
});
