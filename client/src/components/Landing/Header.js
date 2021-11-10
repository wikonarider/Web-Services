import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Toolbar from '@material-ui/core/Toolbar';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import Login from '../Login/Login';
import { useHistory } from 'react-router';
import UserMenu from '../Nav/UserMenu';
import { useSelector } from 'react-redux';
import Register from '../Register/Register';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150vh',
  },
  appbar: {
    background: 'none',
    fontFamily: 'Nunito',
  },
  appbarWrapper: {
    width: '100%',
    textAlign: 'left',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
    margin: '0.5rem',
  },
  iconBtn: {
    '&:hover': {
      background: 'transparent',
    },
  },
  colorText: {
    color: '#8d6e63',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '3rem',
    fontFamily: 'Nunito',
  },
  goDown: {
    color: '#5AFF3D',
    fontSize: '4rem',
  },
}));

const styleLogin = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '70%',
  // bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 2,
};

const Header = ({ cookie }) => {
  const classes = useStyles();
  const { userImg, name } = useSelector((state) => state.user);
  const [checked, setChecked] = useState(false);
  const [login, setLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  // eslint-disable-next-line
  const [registerModal, setRegisterModal] = useState(false);
  const history = useHistory();

  if (login) {
    history.push('/home');
  }

  const handleLogin = () => {
    setLoginModal((prev) => !prev);
  };

  const handleRegister = () => {
    setRegisterModal((prev) => !prev);
  };

  const handleRedirect = () => {
    history.push('/home');
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            WEB <span className={classes.colorText}>SERVICE. </span>
          </h1>
          {!cookie ? (
            <IconButton onClick={handleLogin} className={classes.iconBtn}>
              <SortIcon className={classes.icon} />
              <p>Login</p>
            </IconButton>
          ) : (
            <UserMenu userImg={userImg} name={name} />
          )}
          <Modal
            open={loginModal}
            onClose={handleLogin}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleLogin}>
              <Login
                setLoginModal={setLoginModal}
                setLogin={setLogin}
                setRegisterModal={setRegisterModal}
              />
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 2000 } : {})}
        collapsedSize={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            WEB<span className={classes.colorText}>SERVICE.</span>
          </h1>
          <Scroll to="cards" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>

      <Modal
        open={!cookie ? registerModal : false}
        onClose={handleRegister}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleLogin}>
          <Register
            setRegisterModal={setRegisterModal}
            setLoginModal={setLoginModal}
            handleRedirect={handleRedirect}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
