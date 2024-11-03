import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Header from "../../component/common/header";
import Container from "../../component/dashboard/Container";

const SignUp = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState('No Image');
  const [avatarPreview, setAvatarPreview] = useState(""); // プレビュー用
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState();
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file)); // プレビュー用URLを設定
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setValidPassword(validatePassword(newPassword));
  };
  const validatePassword = (pass) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return pattern.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    // バリデーションチェック
    if (!emailInput.checkVisibility()) {
      console.log("Error: ", emailInput.validationMessage);
      return;
    }

    // FormDataオブジェクトを作成して画像ファイルと他のデータを追加
    const formData = new FormData();
    formData.append("icon_image", avatar);
    formData.append("account_name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birth_date", birthDate);
    formData.append("gender", gender);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const token = localStorage.getItem("token");
    axios
      .post(`${apiUrl}/api/authentication/my_auth/`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        createUserWithEmailAndPassword(auth, email, password);
        navigate('/login');
      })
      .catch((error) => {
        console.log("Error: ", error.response.data);
      });
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <Container style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="h-full flex justify-center">
          <div className="h-full max-w-[850px] flex-grow mx-24 px-24">
            <div className="h-full flex flex-col justify-center mx-24">
              <h2 className="text-2xl font-bold text-center">アカウント作成</h2>
              <form
                className="w-full space-y-3 py-4 text-sm"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="mt-2 flex justify-center relative">
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
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
                <div className="mt-2">
                  <label className="block font-medium text-gray-700">
                    アカウント名<span className="pl-4 text-red-500">必須</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="ponz"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    メールアドレス
                    <span className="pl-4 text-red-500">必須</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="sample@abc.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div style={{ width: "100%", position: "relative" }}>
                  <label className="block font-medium text-gray-700">
                    パスワード<span className="pl-4 text-red-500">必須</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="@qweQWE123"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full p-2 mt-1 border-2 rounded-lg foucus:outline-none foucus:border-blue-300 ${
                      validPassword ? "border-gray-500" : "border-red-500"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    style={{
                      position: "absolute",
                      right: "16px",
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
                {!validPassword && password.length > 0 ? (
                  <span className="text-red-500">
                    小文字1文字、大文字1文字、数字1文字、記号1文字を含む8文字以上のパスワードを入力してください
                  </span>
                ) : (
                  ""
                )}
                <div>
                  <label className="block font-medium text-gray-700">
                    生年月日
                  </label>
                  <input
                    id="birth_date"
                    name="birth_date"
                    type="text"
                    placeholder="2000-01-01"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    性別
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-gray-500 rounded-lg foucus:outline-none foucus:border-blue-300"
                    required
                  >
                    <option value="" disabled>
                      選択してください
                    </option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full mt-4 py-3 font-bold text-sm text-white bg-blue-500 rounded-full hover:bg-blue-700"
                  >
                    アカウントを作成
                  </button>
                </div>
              </form>
              <div className="text-center">
                <a href="/login" className="text-sm text-blue-500 under-line">
                  戻る
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignUp;
