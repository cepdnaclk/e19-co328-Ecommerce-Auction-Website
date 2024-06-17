import React from "react";
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
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Logout from "@mui/icons-material/Logout";
import { ClassNames } from "@emotion/react";
import LoginService from "../../services/LoginServices";
import { useNavigate } from "react-router-dom";
import NotificationComponent from "../NotificationComponent";

export default function NavBar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorE2, setAnchorE2] = React.useState(null);
	const openMenu = Boolean(anchorEl);
	const openNotify = Boolean(anchorE2);
	const [fetchNotifications, setFetchNotifications] = useState(() => () => {});
	const navigate = useNavigate();

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

	const handleLogOut = () => {
		LoginService.logout();
		navigate("/");
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "30px",
				backgroundColor: "white",
				width: "79vw",
				position: "fixed",
				top: "0",
				height: "60px",
				paddingLeft: "5px",
			}}
		>
			<Typography
				variant="h5"
				color="#3f51b5"
				fontFamily="monospace"
				fontSize="30"
				fontWeight="bold"
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
				<IconButton onClick={handleNotifyClick} size="small" sx={{ ml: 2 }}>
					<Badge badgeContent={50} sx={{ color: "#42a5f5" }}>
						<NotificationsActiveIcon />
					</Badge>
				</IconButton>
				<Tooltip title="Account settings">
					<IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
						<Avatar sx={{ width: 32, height: 32, color: "#42a5f5" }}>W</Avatar>
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
				<MenuItem onClick={handleClose}>
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
				sx={{
					boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, 0.2)",
					width: "500px",
					height: "70vh",
				}}
			>
				<Box sx={{ padding: "10px" }}>
					<NotificationComponent fetchNotifications={setFetchNotifications} />
				</Box>
			</Popper>
		</Box>
	);
}
