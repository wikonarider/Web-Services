import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setCookie as setCookieRedux,
  setStatusOrder,
  setCartStorage,
} from '../../redux/actions';
import { useHistory } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';

import Swal from 'sweetalert2';

export default function UserMenu({ route, userImg, name }) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl((prev) => {
      if (!prev) {
        return event.currentTarget;
      }
      return null;
    });
  };

  const logOutClear = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(setCookieRedux(''));
    dispatch({ type: 'GET_USER_INFO', payload: [] });
    dispatch(setStatusOrder(false));
    dispatch(setCartStorage([]));
    Swal.fire({
      title: 'Logged out!',
      icon: 'success',
      confirmButtonText: 'OK',
      iconColor: 'red',
      timer: 3500,
      confirmButtonColor: 'red',
    });

    history.push('/home');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ color: 'primary' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small">
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt={name ? name[0] : ''}
              src={userImg ? userImg : ''}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {route !== 'account' ? (
          <Box>
            <Link
              to="/account"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MenuItem>
                <DashboardIcon sx={{ mr: '8px', color: 'secondary' }} />
                My account
              </MenuItem>
            </Link>
            <Divider />
          </Box>
        ) : null}

        <MenuItem onClick={logOutClear}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
