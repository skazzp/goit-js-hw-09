const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let colorChange = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
stopButton.disabled = true;

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

function onStartClick(event) {
  startButton.disabled = true;
  stopButton.disabled = false;
  colorChange = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick(event) {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(colorChange);
}
