import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const CheckLoginStatus = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user data exists in localStorage
		const user = JSON.parse(localStorage.getItem("user"));
		if (user && user.accessToken) {
			setIsLoggedIn(true); // User is logged in
		} else {
			setIsLoggedIn(false); // No user data in localStorage
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user"); // Clear user data from localStorage
		setIsLoggedIn(false); // Update state to indicate logged out
		navigate("/login"); // Redirect to login page or any other route
	};

	return (
		<Box m="10px">
			<Typography variant="h6" gutterBottom>
				Checking Login Status
			</Typography>
			{isLoggedIn ? (
				<Box mt="50px">
					<Typography variant="body1">You are logged in.</Typography>
					<Button onClick={handleLogout} variant="contained" color="primary">
						Logout
					</Button>
				</Box>
			) : (
				<Box mt="50px">
					<Typography variant="body1">You are not logged in.</Typography>
					<Button
						component={Link}
						to="/login"
						variant="contained"
						color="primary"
					>
						Login
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default CheckLoginStatus;
