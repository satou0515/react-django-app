import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./page/auth/Login";
import "./App.css";
import ForgetPassword from "./page/auth/ForgetPassword";
import SignUp from "./page/auth/SignUp";
import initializeApp from "./init";

initializeApp();

function App() {
  const [notification, setNotification] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <Login
                content={notification}
                setEmail={setEmail}
                setNotification={setNotification}
              />
            }
          />
          <Route
            path="/register"
            element={
              <SignUp
                content={notification}
                setNotification={setNotification}
              />
            }
          />
          <Route path="/forget-pass" element={<ForgetPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
