/**
 * 指定した名前のクッキーの値を取得
 * @param {string} name - 取得するクッキー名
 * @returns {string|null} - クッキーの値、見つからない場合はnull
 */
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

/**
 * 指定した名前のクッキーを設定
 * @param {string} name - 設定するクッキー名
 * @param {string} value - 設定するクッキーの値
 * @param {number} days - 有効期限（日数）
 */
export function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}