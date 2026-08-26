// ▼headerの高さを取得
export function setHeaderHeight(
  selector = '.l-header'
) {
  const header = document.querySelector(selector);
  if (!header) return;

  // PCでは&__wrapがposition:absoluteでheaderの高さに反映されないため、
  // header自体と__wrapの両方を計測して大きい方を実際の高さとして採用する
  const wrap = header.querySelector('.l-header__wrap, .p-top-header__wrap');

  const update = () => {
    const height = Math.max(
      header.offsetHeight,
      wrap ? wrap.offsetHeight : 0
    );

    document.documentElement.style.setProperty(
      '--header-height',
      `${height}px`
    );
  };

  update();
  window.addEventListener('resize', update);
}
// ▲headerの高さを取得
