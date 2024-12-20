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
      const isAuthenticated = sessionStorage.getItem('isAuthenticated');
      if(!isAuthenticated) {
        setUser(user);
        setLoading(false);
      }
    });
    return () => {
      unsubscribed();
    };
  }, []);

  const login = (email, password) => {
    sessionStorage.setItem('isAuthenticated', 'true');
    navigate("/home");
  }

  const logout = () => {
    signOut(auth).then(() => {
      navigate('/login');
      document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.removeItem('isAuthenticated');
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
