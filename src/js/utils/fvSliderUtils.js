import Swiper, { Autoplay, EffectFade } from 'swiper';

// ▼FVスライダー
export function initFvSlider(selector = '.js-fv-slider') {
  const el = document.querySelector(selector);
  if (!el) return;

  new Swiper(el, {
    modules: [Autoplay, EffectFade],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 3000,
  });
}
// ▲FVスライダー
