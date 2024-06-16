import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Popper,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../services/LoginServices';

let stompClient = null;

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [notifications, setNotifications] = useState([]);
  const openMenu = Boolean(anchorEl);
  const openNotify = Boolean(anchorE2);
  const navigate = useNavigate();

  const handleProfileClick = () => {
	navigate("/profile"); // Navigate to the profile page
	handleClose();
   };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the profile page
    handleClose();
  };

  useEffect(() => {
    const initWebSocket = async () => {
		try {
		  const { default: SockJS } = await import('sockjs-client');
		  const { over } = await import('@stomp/stompjs');
	  
		  // Check if the environment is browser-based before initializing WebSocket
		  if (typeof window !== 'undefined') {
			const socket = new SockJS('http://localhost:8080/ws');
			stompClient = over(socket);
			stompClient.connect({}, onConnected, onError);
		  } else {
			console.error('WebSocket initialization skipped. Not in a browser environment.');
		  }
		} catch (error) {
		  console.error('Error initializing WebSocket:', error);
		}
	  };

    initWebSocket();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const onConnected = () => {
    stompClient.subscribe('/topic/notifications', onMessageReceived);
  };

  const onError = (err) => {
    console.error('Error connecting to WebSocket', err);
  };

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifyClick = (event) => {
    setAnchorE2(anchorE2 ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNotify = () => {
    setAnchorE2(null);
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleLogOut = () => {
    LoginService.logout();
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '30px',
        backgroundColor: '#E6F0FF',
        width: '97vw',
        position: 'fixed',
        top: '0',
        height: '60px',
        paddingLeft: '5px',
      }}
    >
      <Typography
        variant="h5"
        color="#3f51b5"
        fontFamily="monospace"
        fontSize="30"
        fontWeight="bold"
        onClick={handleLogoClick}
        sx={{ cursor: 'pointer' }}
      >
        BIDCIRCLE
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', gap: '30px' }}>
        <Button style={{ color: 'white' }} sx={{ backgroundColor: '#3f51b5' }} onClick={handleLogIn}>LOGIN</Button>
        <IconButton onClick={handleNotifyClick} size="small" sx={{ ml: 2 }}>
          <Badge badgeContent={notifications.length} sx={{ color: '#42a5f5' }}>
            <NotificationsActiveIcon />
          </Badge>
        </IconButton>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32, color: '#42a5f5' }}>W</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
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
        <MenuItem onClick={handleProfileClick}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOut}>
          <Logout fontSize="small" />
          Logout
        </MenuItem>
      </Menu>

      <Popper
        open={openNotify}
        anchorEl={anchorE2}
        placement="bottom-end"
        onClose={handleCloseNotify}
        sx={{ boxShadow: '2px 2px 10px 5px rgba(0, 0, 0, 0.2)', width: '500px', height: '70vh' }}
      >
        <Box sx={{ padding: '10px', maxHeight: '70vh', overflowY: 'auto' }}>
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index}>
                <ListItemText primary={notification.content} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popper>
    </Box>
  );
}
