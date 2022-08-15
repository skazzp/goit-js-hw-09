import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('button[data-start]');
const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');
const timerElem = document.querySelector('.timer');
const fieldElements = document.querySelectorAll('.field');
timerElem.style.display = 'flex';
timerElem.style.fontSize = '30px';
timerElem.style.textAlign = 'center';
timerElem.style.paddingTop = '30px';
fieldElements.forEach(elem => {
  elem.style.flexBasis = '150px';
  elem.style.display = 'flex';
  elem.style.flexDirection = 'column';
});

let counter;
let timer = {};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const date = new Date();
// console.log('Date: ', convertMs(date));
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > date) {
      startButton.disabled = false;
      counter = selectedDates[0] - new Date();
      startButton.addEventListener('click', startCounter);
    } else {
      // window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
    }
  },
};

function startCounter() {
  const intervalId = setInterval(() => {
    timer = convertMs(counter);
    startButton.disabled = true;
    daysCounter.textContent = addLeadingZero(timer.days);
    hoursCounter.textContent = addLeadingZero(timer.hours);
    minutesCounter.textContent = addLeadingZero(timer.minutes);
    secondsCounter.textContent = addLeadingZero(timer.seconds);
    if (counter >= 1000) counter -= 1000;
    else {
      clearInterval(intervalId);
      startButton.disabled = false;
      startButton.removeEventListener('click', startCounter);
    }
  }, 1000);
}

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
