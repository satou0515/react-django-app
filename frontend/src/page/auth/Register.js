import React, { useState } from 'react'
import { Container } from "@mui/material";
import axios from 'axios';

const Register = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(''); // プレビュー用
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [sex, setSex] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file)); // プレビュー用URLを設定
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    // バリデーションチェック
    if (password !== validPassword) {
      console.log('Error: Passwords do not match');
      return;
    }
    if(!emailInput.checkVisibility()) {
      console.log('Error: ', emailInput.validationMessage);
    }else {
      return;
    }

    // FormDataオブジェクトを作成して画像ファイルと他のデータを追加
    const formData = new FormData();
    formData.append('icon_image', avatar); // 画像ファイルを追加
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('birthday', birthday);
    formData.append('sex', sex);
    try {
      const response = await axios.post(`${apiUrl}/api/authentication/forget-password/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      console.log('成功！');
    }catch(error) {
      console.log('Error: ', error);
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <Container className="h-full flex flex-col justify-center">
        <div className="h-full flex justify-center">
          <div className="h-full max-w-[850px] flex-grow mx-24 px-24">
            <div className="h-full flex flex-col justify-center mx-24">
            <h2 className="text-2xl font-bold text-center">アカウント作成</h2>
              <form className="w-full space-y-3 py-4 text-xs" onSubmit={handleSubmit} noValidate>
                <div className='mt-2 flex justify-center relative'>
                  <input
                    id='avatar'
                    name='avatar'
                    type='file'
                    accept='image/*'
                    onChange={handleAvatarChange}
                    className="absolute opacity-0 w-24 h-24 rounded-full cursor-pointer"
                    required
                  />
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-24 h-24 rounded-full border-2 border-gray-500 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-2 border-gray-500 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className='mt-2'>
                  <label className="block font-medium text-gray-700">アカウント名<span className='pl-4 text-red-500'>必須</span></label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">メールアドレス<span className='pl-4 text-red-500'>必須</span></label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">新しいパスワード<span className='pl-4 text-red-500'>必須</span></label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">新しいパスワード（確認）<span className='pl-4 text-red-500'>必須</span></label>
                  <input
                    id='validPassword'
                    name='validPassword'
                    type='validPassword'
                    value={validPassword}
                    onChange={(e) => setValidPassword(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">生年月日</label>
                  <input
                    id='birthday'
                    name='birthday'
                    type='text'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">性別</label>
                  <input
                    id='sex'
                    name='sex'
                    type='text'
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full mt-4 py-3 font-bold text-sm text-white bg-blue-500 rounded-full hover:bg-blue-700"
                  >
                    アカウントを作成
                  </button>
                </div>
              </form>
              <div className="text-center">
                <a href="/login" className="text-sm text-blue-500 under-line">戻る</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default Register;
