import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // サインイン/サインアウトの監視
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  const login = (email, password) => {
    navigate("/home");
  }

  const logout = () => {
    signOut(auth).then(() => {
      navigate('/login');
      localStorage.removeItem('csrftoken');
    }).catch((error) => {
      navigate('/home');
    });
    setUser('');
  }

  const value = {
    user,
    login,
    logout,
    loading,
  };

  if (loading) {
    return <p>loading...</p>;
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};
