// ▼headerの高さを取得
export function setHeaderHeight(
  selector = '.l-header, .p-top-header'
) {
  const header = document.querySelector(selector);
  if (!header) return;

  const update = () => {
    document.documentElement.style.setProperty(
      '--header-height',
      `${header.offsetHeight}px`
    );
  };

  update();
  window.addEventListener('resize', update);
}
// ▲headerの高さを取得