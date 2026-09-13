// ▼「お子様」欄の値をバリデーションエラー後も保持する
// tinyTemplate側は配列項目を入力画面の再表示で正しく復元できないため、
// sessionStorageで補完する（送信直前に保存 → 次回ロード時に復元）
export function initCompanionsPersist({
  selector = '.js-companions',
  formSelector = '.p-rsvp__form',
  storageKey = 'rsvp_companions',
} = {}) {
  const inputs = document.querySelectorAll(selector);
  const form = document.querySelector(formSelector);

  if (!inputs.length || !form) return;

  // 復元
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    inputs.forEach((el, i) => {
      if (saved[i]) el.value = saved[i];
    });
  } catch {
    // 壊れたデータは無視
  }

  // 保存（送信直前）
  form.addEventListener('submit', () => {
    const values = Array.from(inputs).map((el) => el.value);
    sessionStorage.setItem(storageKey, JSON.stringify(values));
  });
}
// ▲「お子様」欄の値をバリデーションエラー後も保持する
