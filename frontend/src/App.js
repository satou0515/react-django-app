import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import Login from './page/auth/Login';
import './App.css';
import ForgetPassword from './page/auth/ForgetPassword';
import Register from './page/auth/Register';
import initializeApp from './init';

initializeApp();

function App() {
  const [notification, setNotification] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login content={notification} setEmail={setEmail} setNotification={setNotification} />} />
          <Route path='/register' element={<Register content={notification} setNotification={setNotification} />} />
          <Route path='/forget-pass' element={<ForgetPassword />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
