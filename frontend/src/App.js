import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import Login from './page/auth/Login';
import './App.css';

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
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
