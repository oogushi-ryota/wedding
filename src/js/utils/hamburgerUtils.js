import $ from "jquery";

// ▼ハンバーガーメニュー
export function initHamburgerMenu({
  navSelector = ".js-nav",
  btnSelector = ".js-nav-btn",
  bodySelector = ".l-body",
  extraTargets = [],
} = {}) {
  const $nav = $(navSelector);
  const $btn = $(btnSelector);
  const $body = $(bodySelector);
  const $extraEls = extraTargets.map(sel => $(sel));

  function toggleMenu(isOpen) {
    const method = isOpen ? "addClass" : "removeClass";

    $nav[method]("is-active");
    $btn[method]("is-active");
    $body[method]("is-active");
    $extraEls.forEach($el => $el[method]("is-active"));
  }

  // ハンバーガーボタンクリック
  $btn.on("click", () => {
    const isOpening = !$nav.hasClass("is-active");
    toggleMenu(isOpening);
  });

  // ナビ内のリンククリックでメニューを閉じる（同一ページ内リンク対応）
  $nav.on("click", "a", () => {
    toggleMenu(false);
  });
}
// ▲ハンバーガーメニュー