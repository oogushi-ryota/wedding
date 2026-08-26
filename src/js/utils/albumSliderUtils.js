import Swiper, { Autoplay, EffectCube, Pagination } from 'swiper';

// ▼アルバムキューブスライダー
export function initAlbumSlider(selector = '.js-album-slider') {
  const el = document.querySelector(selector);
  if (!el) return;

  new Swiper(el, {
    modules: [Autoplay, EffectCube, Pagination],
    effect: 'cube',
    grabCursor: true,
    loop: true,
    speed: 1200,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 15,
      shadowScale: 0.8,
    },
    pagination: {
      el: el.querySelector('.swiper-pagination'),
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}
// ▲アルバムキューブスライダー
