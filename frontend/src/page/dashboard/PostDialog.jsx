import { Box, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { getCookie } from '../../services/cookieService';

const PostDialog = ({ handleClose }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [postContent, setPostContent] = useState('');
  const [validContent, setValidContent] = useState(false);

  const { user } = useContext(AuthContext); // user情報の取得

  const handleChange = (e) => {
    const value = e.target.value;
    setPostContent(value);
    if(value.length <= 140) {
      setValidContent(false);
    }else {
      setValidContent(true);
    }
  };

  const handlePostSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // const cookie = document.cookie; //fetchCsrfToken();
    const cookie = getCookie('csrftoken');
    console.log(">>> ", document.cookie);
    console.log(">>> ", cookie);

    const data = {};
    
    if(validContent) {
      console.log('140文字を超えての投稿はできません。');
      return;
    }
    if(postContent) {
      data['firebase_uid'] = user.uid;
      data['content'] = postContent;

      // axios.defaults.xsrfCookieName = 'csrftoken'
      // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
      // axios.post(`${apiUrl}/api/post/users-post/`, data, {
      //   headers: {
      //     // 'X-CSRFToken': cookie, // CSRFトークンをヘッダーに追加
      //     Accept: "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   withCredentials: true   // クロスドメインでCookieを送信
      // }).then((response) => {
      //   handleClose(); // 投稿後にダイアログを閉じる
      //   setPostContent(""); // ダイアログを閉じたときに入力内容をリセット
      //   console.log(response.data.status);
      // }).catch((error) => {
      //   console.log('Error: ', error);
      // })
      fetch(`${apiUrl}/api/post/users-post/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie,
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        handleClose();
        setPostContent("");
        console.log(data.status);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
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
          inputProps={{ maxLength: 140 }} // 140文字制限
        />
      </div>
      <div style={ButtonsStyle()}>
        <button onClick={handleClose} style={CancelButtonStyle()}>
          キャンセル
        </button>
        <button onClick={handlePostSubmit} style={PostButtonStyle()}>
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
