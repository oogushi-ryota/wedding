// ▼footerの高さを取得
export function setFooterHeight(selector = '.l-footer') {
  const footer = document.querySelector(selector);
  if (!footer) return;

  const update = () => {
    const height = footer.offsetHeight;
    document.documentElement.style.setProperty(
      '--footer-height',
      `${height}px`
    );
  };

  // 初期計測
  update();

  // リサイズ対応
  window.addEventListener('resize', update);
}
// ▲footerの高さを取得