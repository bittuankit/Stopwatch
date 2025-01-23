const time = document.querySelector(".time");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

let timer = 0;
let start = 0;
let elapsed = 0;
let isRunning = false;

startBtn.addEventListener("click", () => {
  startBtn.textContent === "Start" ? startTime() : stopTime();
  console.log(startBtn.textContent);
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
  clearInterval(timer);
  start = 0;
  elapsed = 0;
  isRunning = false;
  time.textContent = "00:00:00:00";
});

const updateTime = () => {
  const currentTime = Date.now();
  elapsed = currentTime - start;

  let hours = String(Math.floor(elapsed / (1000 * 60 * 60))).padStart(2, "0");
  let minutes = String(Math.floor((elapsed / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  let seconds = String(Math.floor((elapsed / 1000) % 60)).padStart(2, "0");
  let millisecond = String(Math.floor((elapsed % 1000) / 10)).padStart(2, "0");

  hours = time.textContent = `${hours}:${minutes}:${seconds}:${millisecond}`;
};
