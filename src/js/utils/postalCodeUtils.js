// ▼郵便番号から都道府県・市区町村を自動入力
export function initPostalCodeAutofill({
  postalCodeSelector = '#post-num',
  prefectureSelector = '#prefecture',
  addressSelector = '#address',
} = {}) {
  const postalCodeEl = document.querySelector(postalCodeSelector);
  const prefectureEl = document.querySelector(prefectureSelector);
  const addressEl = document.querySelector(addressSelector);

  if (!postalCodeEl || !prefectureEl || !addressEl) return;

  const fillAddress = async () => {
    const digits = postalCodeEl.value.replace(/[^0-9]/g, '');
    if (digits.length !== 7) return;

    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`);
      const data = await res.json();
      const result = data.results && data.results[0];
      if (!result) return;

      prefectureEl.value = result.address1;
      prefectureEl.dispatchEvent(new Event('change', { bubbles: true }));

      addressEl.value = `${result.address2}${result.address3}`;
    } catch {
      // 通信エラー時は何もしない（手入力を妨げない）
    }
  };

  postalCodeEl.addEventListener('blur', fillAddress);
}
// ▲郵便番号から都道府県・市区町村を自動入力
