// ▼スクロールに応じたフェードイン演出
export function initFadeIn(selector = '.js-fadein') {
  const targets = document.querySelectorAll(selector);
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -18% 0px',
  });

  targets.forEach((target) => observer.observe(target));
}
// ▲スクロールに応じたフェードイン演出
