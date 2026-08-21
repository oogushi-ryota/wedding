// ▼vw単位のCSS変数を設定
export const setVw = function () {
  const vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
};
// ▲vw単位のCSS変数を設定
