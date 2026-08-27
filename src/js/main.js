// === ユーティリティライブラリ読み込み ===
import { setVw } from "./utils/vwUtils.js";
import { initFvSlider } from "./utils/fvSliderUtils.js";
import { initAlbumSlider } from "./utils/albumSliderUtils.js";
import { initWeddingCountdown } from "./utils/countdownUtils.js";
import { initHamburgerMenu } from "./utils/hamburgerUtils.js";
import { setHeaderHeight } from "./utils/headerHeightUtils.js";
import { setFooterHeight } from "./utils/footerHeightUtils.js";
import { initAnchorSmoothScroll } from "./utils/scrollUtils.js";
import { initFadeIn } from "./utils/fadeInUtils.js";
import { initPostalCodeAutofill } from "./utils/postalCodeUtils.js";
import { initCompanionsPersist } from "./utils/companionsPersistUtils.js";

// vw単位のCSS変数（--vw）はvwp()/vws()が参照するため、描画前に早めにセットしておく
setVw();
window.addEventListener('resize', setVw);

// HTMLの構造がすべて解析されて、DOM操作が安全に行える状態になったタイミングで実行
window.addEventListener('DOMContentLoaded', () => {
  initFvSlider();                // ← FVスライダー
  initAlbumSlider();             // ← アルバムカードスライダー
  initWeddingCountdown();       // ← 挙式日カウントダウン
  initHamburgerMenu();          // ← ハンバーガーメニュー
  setHeaderHeight();            // ← ヘッダーの高さを取得
  setFooterHeight();            // ← フッターの高さを取得
  initAnchorSmoothScroll();     // ← スムーススクロール
  initFadeIn();                  // ← スクロールフェードイン
  initPostalCodeAutofill();      // ← 郵便番号から住所自動入力
  initCompanionsPersist();       // ← ご連名欄の値をバリデーションエラー後も保持
});