// ▼挙式日カウントダウン
export function initWeddingCountdown(targetDate = '2026-11-21T13:50:00') {
  const daysEls = document.querySelectorAll('.js-countdown-days');
  const hoursEls = document.querySelectorAll('.js-countdown-hours');
  const minutesEls = document.querySelectorAll('.js-countdown-minutes');
  const secondsEls = document.querySelectorAll('.js-countdown-seconds');

  if (!daysEls.length && !hoursEls.length && !minutesEls.length && !secondsEls.length) return;

  const target = new Date(targetDate).getTime();

  const pad = (num) => String(num).padStart(2, '0');
  const setText = (els, text) => els.forEach((el) => { el.textContent = text; });

  const update = () => {
    const diff = Math.max(target - Date.now(), 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setText(daysEls, days);
    setText(hoursEls, pad(hours));
    setText(minutesEls, pad(minutes));
    setText(secondsEls, pad(seconds));

    if (diff <= 0) clearInterval(timerId);
  };

  update();
  const timerId = setInterval(update, 1000);
}
// ▲挙式日カウントダウン
