import React, { useEffect, useState } from "react";
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
	Button,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import LoginService from "../../services/LoginServices";

let stompClient = null;

export default function NavBar() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorE2, setAnchorE2] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
	const [username, setUsername] = useState(""); // Track username
	const openMenu = Boolean(anchorEl);
	const openNotify = Boolean(anchorE2);
	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate("/profile");
		handleClose();
	};

	const handleLogoClick = () => {
		navigate("/");
		handleClose();
	};

	useEffect(() => {
		// Mock login status check
		const checkLoginStatus = async () => {
			const status = await LoginService.isLoggedIn(); // Replace with actual login status check
			setIsLoggedIn(status);
			if (status) {
				const user = await LoginService.getUserName(); // Replace with actual username retrieval
				console.log(user);
				setUsername(user);
			}
		};

		checkLoginStatus();

		const initWebSocket = async () => {
			try {
				const { default: SockJS } = await import("sockjs-client");
				const { over } = await import("@stomp/stompjs");

				if (typeof window !== "undefined") {
					const socket = new SockJS("ws://localhost:9081/ws/notifications");
					stompClient = over(socket);
					stompClient.connect({}, onConnected, onError);
				} else {
					console.error(
						"WebSocket initialization skipped. Not in a browser environment."
					);
				}
			} catch (error) {
				console.error("Error initializing WebSocket:", error);
			}
		};

		if (isLoggedIn && typeof window !== "undefined") {
			initWebSocket();
		}

		return () => {
			if (stompClient) {
				stompClient.disconnect();
			}
		};
	}, [isLoggedIn]);

	const onConnected = () => {
		stompClient.subscribe("/topic/notifications", onMessageReceived);
	};

	const onError = (err) => {
		console.error("Error connecting to WebSocket", err);
	};

	const onMessageReceived = (msg) => {
		const notification = JSON.parse(msg.body);
		setNotifications((prevNotifications) => [
			...prevNotifications,
			notification,
		]);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleNotifyClick = (event) => {
		setAnchorE2(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setAnchorE2(null);
	};

	const handleLogIn = () => {
		navigate("/login");
	};

	const handleSignUp = () => {
		navigate("/signup");
	};

	const handleLogOut = () => {
		LoginService.logout();
		setIsLoggedIn(false);
		navigate("/");
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "30px",
				backgroundColor: "#E6F0FF",
				width: "98vw",
				position: "fixed",
				top: "0",
				height: "60px",
				paddingLeft: "10px",
				paddingRight: "10px",
			}}
		>
			<Typography
				variant="h5"
				color="#3f51b5"
				fontFamily="monospace"
				fontSize="30"
				fontWeight="bold"
				onClick={handleLogoClick}
				sx={{ cursor: "pointer" }}
			>
				BIDCIRCLE
			</Typography>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "right",
					gap: "30px",
				}}
			>
				{isLoggedIn ? (
					<>
						<IconButton onClick={handleNotifyClick} size="small" sx={{ ml: 2 }}>
							<Badge
								badgeContent={notifications.length}
								sx={{ color: "#42a5f5" }}
							>
								<NotificationsActiveIcon />
							</Badge>
						</IconButton>
						<Tooltip title="Account settings">
							<IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
								<Avatar sx={{ width: 32, height: 32, color: "#42a5f5" }}>
									{username.charAt(0).toUpperCase()}
								</Avatar>
							</IconButton>
						</Tooltip>
					</>
				) : (
					<>
						<Button
							style={{ color: "white" }}
							color="secondary"
							variant="contained"
							onClick={handleLogIn}
						>
							LOGIN
						</Button>
						<Button
							style={{ color: "white" }}
							color="primary"
							variant="contained"
							onClick={handleSignUp}
						>
							SIGN UP
						</Button>
					</>
				)}
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={openMenu}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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

			<Menu
				anchorEl={anchorE2}
				id="notification-menu"
				open={openNotify}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						width: "500px",
						maxHeight: "70vh",
						overflowY: "auto",
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<Box sx={{ padding: "10px" }}>
					<List>
						{notifications.map((notification, index) => (
							<ListItem key={index}>
								<ListItemText primary={notification.content} />
							</ListItem>
						))}
					</List>
				</Box>
			</Menu>
		</Box>
	);
}
