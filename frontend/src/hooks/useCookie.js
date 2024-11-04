import { useState, useEffect } from 'react';
import { getCookie } from '../utils/cookieUtils';

/**
 * クッキーの値を取得するカスタムフック
 * @param {string} name - 取得するクッキー名
 * @returns {string|null} - クッキーの値
 */
export function useCookie(name) {
  const [cookieValue, setCookieValue] = useState(getCookie(name));

  useEffect(() => {
    // クッキーが変わる可能性がある場合の更新処理
    const updateCookieValue = () => {
      setCookieValue(getCookie(name));
    };

    // クッキーの監視ロジック（例: 定期的にチェック）
    const interval = setInterval(updateCookieValue, 1000);

    return () => clearInterval(interval); // クリーンアップ
  }, [name]);

  return cookieValue;
}