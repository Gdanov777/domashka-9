import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelayEl = document.querySelector('input[name = "delay"]');
const stepEl = document.querySelector('input[name = "step"]');
const amountEl = document.querySelector('input[name = "amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const firstDelay = Number(firstDelayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);

  for (let i = 1; i <= amount; i += 1) {
    const delayStep = firstDelay + step * (i - 1);
    createPromise(i, delayStep)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
}