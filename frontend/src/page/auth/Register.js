import React, { useState } from 'react'
import { Container } from "@mui/material";

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [sex, setSex] = useState('');

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
            <h2 className="text-2xl font-bold text-center">アカウント作成</h2>
              <form className="w-full space-y-6 py-4" onSubmit={handleSubmit} noValidate>
                <div className='mt-2'>
                  <label className="block text-sm font-medium text-gray-700">アカウント名</label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">新しいパスワード<span className='pl-4 text-red-500'>必須</span></label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">新しいパスワード（確認）<span className='pl-4 text-red-500'>必須</span></label>
                  <input
                    id='validPassword'
                    name='validPassword'
                    type='validPassword'
                    value={validPassword}
                    onChange={(e) => setValidPassword(e.target.value)}
                    className="w-full p-3 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">生年月日</label>
                  <input
                    id='birthday'
                    name='birthday'
                    type='text'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full p-3 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">性別</label>
                  <input
                    id='sex'
                    name='sex'
                    type='text'
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full p-3 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-3 text-white bg-blue-500 rounded-full hover:bg-blue-700"
                  >
                    アカウントを作成
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
export default Register;
