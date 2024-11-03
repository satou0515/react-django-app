import { Box, TextField } from '@mui/material';
import React, { useState } from 'react'

const PostDialog = ({ editFlag, handleClose }) => {
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // ここで投稿処理を行う（APIへの送信など）
    console.log("投稿内容:", postContent);
    handleClose(); // 投稿後にダイアログを閉じる
    setPostContent(""); // ダイアログを閉じたときに入力内容をリセット
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
          onChange={(e) => setPostContent(e.target.value)}
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
