import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

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
      <div className="h-full flex justify-center">
        <div className="h-full max-w-[650px] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-center">ログイン</h2>
          <form className="block text-sm font-medium text-gray-700">
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                アカウントID（メールアドレス）<span className="text-red-500">　必須</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full p-3 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-midium text-gray-700">
                パスワード<span className="text-red-500">　必須</span>
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full p-3 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-3 text-white bg-blue-500 rounded-full hover:bg-blue-700"
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center">
        <a href="/forget-pass" className="text-sm text-blue-500 under-line">パスワードを忘れた方はこちら</a>
        <br />
        <a href="/register" className="text-sm text-blue-500 under-line">アカウントをお持ちでない方はこちら</a>
      </div>
    </div>
  );
};

export default Login;