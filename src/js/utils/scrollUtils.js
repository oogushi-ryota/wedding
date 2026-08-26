// ▼スムーススクロール処理
export function initAnchorSmoothScroll() {
  /**
   * ターゲット要素自身の scroll-margin-top を取得
   * （セクションごとにCSSでオフセットの有無を調整できる）
   */
  const getScrollMarginTop = (el) => {
    return parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  };

  /**
   * targetを実際にスクロールしている祖先要素を探す
   * （PCレイアウトでは window ではなく .l-sp-wrap 等がスクロールコンテナになるため）
   */
  const getScrollParent = (el) => {
    let parent = el.parentElement;

    while (parent) {
      const { overflowY } = getComputedStyle(parent);
      if ((overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight) {
        return parent;
      }
      parent = parent.parentElement;
    }

    return document.scrollingElement || document.documentElement;
  };

  /**
   * スクロール処理
   */
  const scrollToTarget = (target, smooth = true) => {
    if (!target) return;

    const scrollMarginTop = getScrollMarginTop(target);
    const scrollParent = getScrollParent(target);
    const behavior = smooth ? 'smooth' : 'auto';

    if (scrollParent === document.scrollingElement || scrollParent === document.documentElement) {
      const offset = target.getBoundingClientRect().top + window.pageYOffset - scrollMarginTop;
      window.scrollTo({ top: offset, behavior });
    } else {
      const offset =
        target.getBoundingClientRect().top -
        scrollParent.getBoundingClientRect().top +
        scrollParent.scrollTop -
        scrollMarginTop;
      scrollParent.scrollTo({ top: offset, behavior });
    }
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

      // ハンバーガーメニューを閉じる処理（別リスナー）が先に完了してから
      // スクロールコンテナを判定させるため、1ティック遅らせる
      setTimeout(() => {
        scrollToTarget(target, true);
      }, 0);
    });
  });
}
// ▲スムーススクロール処理
