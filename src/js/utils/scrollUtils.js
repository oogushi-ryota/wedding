// ▼スムーススクロール処理
export function initAnchorSmoothScroll() {
  /**
   * CSS変数から header 高さを取得
   */
  const getHeaderHeight = () => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--header-height');
    return parseFloat(value) || 0;
  };

  /**
   * スクロール処理
   */
  const scrollToTarget = (target, smooth = true) => {
    if (!target) return;

    const headerHeight = getHeaderHeight();
    const offset =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    window.scrollTo({
      top: offset,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  /**
   * ① 別ページから /#xxx で遷移した場合
   */
  const pageHash = window.location.hash;
  if (pageHash) {
    const target = document.getElementById(pageHash.slice(1));
    if (target) {
      // ブラウザの自動アンカーを無効化
      history.replaceState(null, '', window.location.pathname);

      window.addEventListener('load', () => {
        scrollToTarget(target, true);
      });
    }
  }

  /**
   * ② 同一ページ内アンカー
   */
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.hash;
      if (!hash) return;

      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      e.preventDefault();
      scrollToTarget(target, true);
    });
  });
}
// ▲スムーススクロール処理