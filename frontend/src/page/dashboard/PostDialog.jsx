import { Box, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { getCookie } from '../../services/cookieService';


const PostDialog = ({ handleClose }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [postContent, setPostContent] = useState('');
  const [validContent, setValidContent] = useState(false);
  const [commonCookie, setCommonCookie] = useState('');
  const { user } = useContext(AuthContext); // user情報の取得

  useEffect(() => {
    setCommonCookie(getCookie('csrftoken'));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setPostContent(value);
    if(value.length <= 140) {
      setValidContent(false);
    }else {
      setValidContent(true);
    }
  };

  // CSRFトークンを取得してcommonCookieにセットする関数
  const fetchCsrfToken = async() => {
    try {
      const response = await axios.get(`${apiUrl}/api/post/get-csrf-token/`, {
        withCredentials: true, // Cookieを含める
      });
      const csrfToken = response.data.csrfToken;
      setCommonCookie(csrfToken);
      console.log('fetch: ', csrfToken);
      return csrfToken;
    } catch (error) {
      console.error('CSRF token fetch error: ', error);
      return;
    }
  };

  // リクエストをリトライ
  const apiRequest = async(config) => {
    try {
      return await axios(config);
    }catch(error) {
      if (error.response && error.response.status === 403) {
        await fetchCsrfToken(); // CSRFトークンを再取得
        config.headers['X-CSRFToken'] = commonCookie; // 新しいトークンでリトライ
        return axios(config);
      }
      console.log("apiRequest Error: ", error);
      throw error; // その他のエラーはそのまま投げる
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
  
    // CSRFトークンの取得
    const csrfToken = getCookie('csrftoken'); // トークンを取得
    const token = localStorage.getItem("token");
  
    const data = {
      firebase_uid: user.uid,
      content: postContent,
    };
  
    // リクエストを送信
    try {
      const response = await apiRequest({
        method: 'post',
        url: `${apiUrl}/api/post/users-post/`,
        data,
        headers: {
          'X-CSRFToken': csrfToken, // 最新のCSRFトークンを使用
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // ここでトークンを取得
        },
        withCredentials: true,
      });
  
      handleClose(); // 投稿後にダイアログを閉じる
      setPostContent(""); // ダイアログを閉じたときに入力内容をリセット
      console.log(response.data.status);
    } catch (error) {
      console.error('Error: ', error);
    }
    console.log("投稿内容:", postContent);
  };

  return (
    <Box style={DialogStyle()}>
      <div>
        <TextField
          autoFocus
          margin="dense"
          label="投稿内容 (140文字まで)"
          type="text"
          multiline // 折り返し
          rows={6}
          fullWidth
          variant="outlined"
          value={postContent}
          onChange={handleChange}
        />
      </div>
      <div style={ButtonsStyle()}>
        <button onClick={handleClose} style={CancelButtonStyle()}>
          キャンセル
        </button>
        <button onClick={handlePostSubmit} style={PostButtonStyle()} disabled={validContent}>
          ポストする
        </button>
      </div>
    </Box>
  )
}

const DialogStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '540px',
  height: '320px',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px'
});

const ButtonsStyle = () => ({
  display: 'flex',
  justifyContent: 'end',
  padding: '0.5rem',
  paddingBottom: '0',
  gap: '1.2rem',
  fontSize: '16px'
});

const ButtonStyle = () => ({
  padding: '8px 20px',
  borderRadius: '8px'
});
const CancelButtonStyle = () => ({
  ...ButtonStyle(), // 共通スタイル
  backgroundColor: '#fff',
  border: '2px solid #888'
});
const PostButtonStyle = () => ({
  ...ButtonStyle(),
  backgroundColor: '#3B82F6',
  color: 'white',
  border: '2px solid #3B82F6'
});

export default PostDialog;
