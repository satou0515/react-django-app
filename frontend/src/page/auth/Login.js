import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Container } from "@mui/material";

const Login = (props) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState();
  // const [error, setError] = useState('');
  const [content, setContent] = useState('');
  const { login } = useContext(UserContext);

  useEffect(() => {
    if(props.content) {
      setContent(props.content);
      props.setNotification('');
    }
  }, [props.content]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    props.setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setEmail(e.target.value);
  }

  // const handleTogglePassword = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }
  return (
    <div className="h-screen overflow-hidden">
      <Container className="h-full flex flex-col justify-center">
        <div className="h-full flex justify-center">
          <div className="h-full max-w-[850px] flex-grow mx-24 px-24">
            <div className="h-full flex flex-col justify-center mx-24">
              <h2 className="text-2xl font-bold text-center">ログイン</h2>
              <form className="w-full space-y-3 py-4 text-xs">
                <div className="mt-2">
                  <label className="block font-medium text-gray-700">
                    アカウント名／メールアドレス<span className="pl-4 text-red-500">必須</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                  />
                </div>
                <div className="mt-2">
                  <label className="block font-midium text-gray-700">
                    パスワード<span className="pl-4 text-red-500">必須</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full mt-4 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-700"
                  >
                    ログイン
                  </button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <a href="/forget-pass" className="text-sm text-blue-500 under-line">パスワードを忘れた方はこちら</a>
                <br />
                <a href="/register" className="text-sm text-blue-500 under-line">アカウントをお持ちでない方はこちら</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;