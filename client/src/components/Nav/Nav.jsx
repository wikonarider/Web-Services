import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Modal from '@mui/material/Modal';
import SearchBar from '../SearchBar/SearchBar';
import Cart from '../Cart/Cart';
import SideBar from '../SideBar/SideBar';
import UserMenu from './UserMenu';
import Login from '../Login/Login';
import Register from '../Register/Register';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from './ScrollTop';
// import clsx from "clsx";
import useMediaQuery from '@mui/material/useMediaQuery';

import DarkMode from './DarkMode';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
};

export default function Nav({ route, check, change }) {
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const cookie = useSelector((state) => state.cookie);
  const { userImg, name } = useSelector((state) => state.user);
  const query = useMediaQuery('(max-width: 820px)');
  const darkTheme = useSelector((state) => state.darkTheme);

  const handleLogin = () => {
    setLoginModal((prev) => !prev);
    setRegisterModal(() => false);
  };

  const handleRegister = () => {
    setRegisterModal((prev) => !prev);
    setLoginModal(() => false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '101%',
      }}
      id="back-to-top-anchor"
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: '1201',
          p: 1,
          backgroundColor: darkTheme ? 'primary' : '#CFD8DC',
        }}
      >
        <Toolbar
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 9fr 2fr',
            gridTemplateRows: query && route === 'home' ? '72px 80px' : '',
          }}
        >
          <Box mr="auto" display="flex" alignItems="center">
            {route === 'home' ? (
              <>
                <SideBar />
                <DarkMode />
              </>
            ) : (
              <>
                <IconButton color="inherit" component={Link} to="/home">
                  <HomeIcon />
                </IconButton>
                <DarkMode />
              </>
            )}
          </Box>

          {/* --------------- SEARCH BAR---------------------- */}
          <Box
            sx={
              route === 'home'
                ? {
                    width: '100%',
                    maxWidth: '920px',
                    ml: 'auto',
                    mr: 'auto',
                    gridColumnStart: query ? '1' : '',
                    gridColumnEnd: query ? '4' : '',
                  }
                : { display: 'none' }
            }
          >
            {route === 'home' ? <SearchBar /> : null}
          </Box>
          {/* ---------------------------------------- */}

          <Box
            display="flex"
            gap="5px"
            p="5px"
            ml="auto"
            sx={{
              gridColumnStart: '3',
              gridRowStart: '1',
            }}
          >
            {/* Register */}
            {cookie || route === 'checkout' ? null : (
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                disableElevation
                onClick={handleRegister}
              >
                REGISTER
              </Button>
            )}

            {!cookie && route !== 'checkout' ? (
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                disableElevation
                onClick={handleLogin}
              >
                Login
              </Button>
            ) : null}
            {/* ------------------------------------------ */}

            {/* ----------- REGISTER MODAL ------------------ */}
            <Modal
              open={registerModal}
              onClose={handleRegister}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Register
                  setRegisterModal={setRegisterModal}
                  setLoginModal={setLoginModal}
                />
              </Box>
            </Modal>

            {/* ----------------- LOGIN MODAL -------------------------- */}
            <Modal
              open={loginModal}
              onClose={handleLogin}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Login
                  setLoginModal={setLoginModal}
                  setRegisterModal={setRegisterModal}
                />
              </Box>
            </Modal>
            {/* ------------------------------------------------ */}

            {route === 'checkout' ? null : <Cart route={route} />}
            {cookie ? (
              <UserMenu route={route} userImg={userImg} name={name} />
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
