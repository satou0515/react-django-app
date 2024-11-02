// import axios from 'axios';
import React, { useState } from 'react'
import { Container } from "@mui/material";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    // バリデーションチェック
    if(!emailInput.checkVisibility()) {
      console.log('Error: ', emailInput.validationMessage);
    }else {
      try {
        // const response = await axios.post(`${apiUrl}/api/authentication/forget-password/`, { email });
        console.log('成功！');
      }catch(error) {
        console.log('Error: ', error);
      }
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <Container className="h-full flex flex-col justify-center">
        <div className="h-full flex justify-center">
          <div className="h-full max-w-[850px] flex-grow mx-24 px-24">
            <div className="h-full flex flex-col justify-center mx-24">
              <h2 className="text-2xl font-bold text-center">パスワード再設定</h2>
              <form className="w-full space-y-3 py-4 text-xs" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block font-medium text-gray-700">メールアドレス</label>
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
                <div className="mt-8">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-3 text-white bg-blue-500 rounded-full hover:bg-blue-700"
                  >
                    送信
                  </button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <a href="/login" className="text-sm text-blue-500 under-line">戻る</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default ForgetPassword;
