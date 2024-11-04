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