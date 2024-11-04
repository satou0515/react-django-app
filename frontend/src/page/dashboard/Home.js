import { Navigate  } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Box, Container, Fade, Modal } from '@mui/material';
import AllPost from '../../component/dashboard/AllPost';
import PostDialog from './PostDialog';
import { setCookie } from '../../services/cookieService';
import { useContext, useEffect, useState } from 'react';

const Home = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/post/get-csrf-token/`, {
          method: 'GET',
          credentials: 'include', // Cookieを含める
        });
        
        const data = await response.json();
        // CSRFトークンをCookieに設定
        // document.cookie = `csrftoken=${data.csrfToken}; path=/; SameSite=None; Secure`;  // httpsで設定
        document.cookie = `csrftoken=${data.csrfToken}; path=/; SameSite=None; Secure`;
        setCookie('csrftoken', data.csrfToken, 1); // 有効期限1日
      }catch(error) {
        console.error('CSRF token fetch error: ', error);
      }
    };

    fetchCsrfToken();
  }, [apiUrl]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = '#2563EB'; // hover:bg-blue-700
  };
  const handleLeave = (e) => {
    e.target.style.backgroundColor = '#3B82F6'; // bg-blue-500
  };

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Container style={ContainerStyle()}>
        <div style={BodyStyle()}>
          <div>
            <button
              style={ButtonStyle()}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              onClick={handleClickOpen}
            >
              ポストする
            </button>
          </div>
          <div style={PostBodyStyle()}>
            <AllPost />
          </div>
          <Modal
            aria-labelledby='transition-model-title'
            aria-describedby='transition-modal-description'
            open={open}
            onClose={handleClose}
          >
            <Fade in={open}>
              <Box style={ModalBoxStyle()}>
                <PostDialog handleClose={handleClose} />
              </Box>
            </Fade>
          </Modal>
        </div>
      </Container>
    );
  }
};

const ContainerStyle = () => ({
  maxHeight: 'calc(100vh - 60px)',
  width: '100vw',
  margin: '0 auto',
  padding: '2.5rem',
  ...(window.innerWidth >= 640 && { padding: 'auto 2.5rem' }),
  ...(window.innerWidth >= 720 && { padding: 'auto 3.5rem' }),
  ...(window.innerWidth >= 1280 && { padding: 'auto 5rem' })
});

const BodyStyle = () => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  padding: '20px',
  paddingRight: '10%',
  overflow: 'auto',
});

const PostBodyStyle = () => ({
  width: '540px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  height: '100vh',
  backgroundColor: '#f5f5f5',
});

const ButtonStyle = () => ({
  position: 'fixed',
  marginTop: '5rem',
  padding: '0.75rem 1rem',
  color: 'white',
  backgroundColor: '#3B82F6',
  borderRadius: '5rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
});

const ModalBoxStyle = () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
});

export default Home;