import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'; 

import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase';

const Header = () => {
  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
    navigate('/login');
    logout();
  }

  const GuestHeader = () => {
    return (
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
        <div>
          <Link to='/login' style={{color: 'black', fontWeight: 'bold'}}>Demo App</Link>
        </div>
      </header>
    );
  };

  const UserHeader = () => {
    return (
      <header style={{ position: 'fixed', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '1.188rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: '#fff' }}>
        <Link to='/login' style={{color: 'black', fontWeight: 'bold'}}>Demo App</Link>
        <div>
          <button
            type="submit"
            onClick={handleSignOut}
            style={{
              width: '6rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              borderRadius: '3rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#3B82F6';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.color = '';
            }}
          >
            ログアウト
          </button>
        </div>
      </header>
    );
  };

  return (
    <>
    {user ? <UserHeader /> : <GuestHeader />}
    </>
  )
}
export default Header;
