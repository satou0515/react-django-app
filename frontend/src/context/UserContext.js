import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if(!isAuthenticated) {
      logout();
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  const fetchUser = () => {
    const token = localStorage.getItem('token');
    if(token) {
      // Axiosのリクエストを実行
      // axios.get('api/authentication/user-role/', {
      //   headers: { Authorization: `Bearer ${token}` }
      // })
      // .then(response => {
      //   setUser(response.data);
      // })
      // .catch(error => {
      //   localStorage.removeItem('token');
      //   navigate('/login');
      // })
      // .finaly(() => {
      //   setLoading(false);
      // });
    }else {
      setLoading(false);
    }
  };

  const login = (email, password) => {
    // let remember = false;

    // 認証処理成功
    sessionStorage.setItem('isAuthenticated', 'true');

    // setError('');
    // axios.post('/api/authentication/login/', { email, password })
    //   .then(response => {
    //     const { token } = response.data.result;
    //     localStorage.setItem('token', token);
    //     // remember = response.data.result.user.remember;
    //     return axios.get('/api/authentication/user-role/', {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });
    //   })
    //   .then(response => {
    //     setUser(response.data);
    //   })
    //   .catch(error => {
    //     console.log("Error: ", error);
    //     // setError('');
    //   })
  };

  const logout = () => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if(isAuthenticated) {
      navigate('/login');
      sessionStorage.removeItem('isAuthenticated');
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}