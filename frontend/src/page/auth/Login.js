import React, { useContext, useEffect, useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../component/common/header";
import Container from "../../component/dashboard/Container";

const Login = (props) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState();

  const { login } = useContext(AuthContext);

  useEffect(() => {
    console.log("Login Page");
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    props.setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      login(email, password);

    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <Container style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="h-full flex justify-center">
          <div className="h-full max-w-[850px] flex-grow mx-24 px-24">
            <div className="h-full flex flex-col justify-center mx-24">
              <h2 className="text-2xl font-bold text-center">ログイン</h2>
              <form className="w-full space-y-3 py-4 text-sm">
                <div className="mt-2">
                  <label className="block font-medium text-gray-700">
                    メールアドレス
                    <span className="pl-4 text-red-500">必須</span>
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
                <div className="mt-2" style={{ width: "100%", position: "relative" }}>
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
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? (
                      <MdOutlineVisibility size={20} />
                    ) : (
                      <MdOutlineVisibilityOff size={20} />
                    )}
                  </button>
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
                <a
                  href="/forget-pass"
                  className="text-sm text-blue-500 under-line"
                >
                  パスワードを忘れた方はこちら
                </a>
                <br />
                <a
                  href="/register"
                  className="text-sm text-blue-500 under-line"
                >
                  アカウントをお持ちでない方はこちら
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
