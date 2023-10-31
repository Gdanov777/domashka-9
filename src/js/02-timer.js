import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    stopTime = selectedDates[0].getTime();

    if (stopTime < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
  },
});

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startButton.disabled = true;
startButton.addEventListener('click', () => {
  timer.start();
  timer.stop();
});

let stopTime = 0;

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = stopTime - currentTime;
      const time = convertMs(deltaTime);
      updateClockFace(time);
    }, 1000);
  },
  stop() {
    const stopDelay = stopTime - Date.now();
    setTimeout(() => {
      clearInterval(this.intervalId);
      this.isActive = false;
    }, stopDelay);
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysElement.textContent = `${days}`;
  hoursElement.textContent = `${hours}`;
  minutesElement.textContent = `${minutes}`;
  secondsElement.textContent = `${seconds}`;
}
