import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LoginService from "./LoginServices"; // Adjust the import path as needed

const Profile = () => {
	const [profileData, setProfileData] = useState(null);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await LoginService.axiosInstance.get("/user/profile");
				setProfileData(response.data);
			} catch (error) {
				console.error("Error fetching profile:", error);
				// Handle error state or show error message
			}
		};

		fetchUserProfile();
	}, []);

	if (!profileData) {
		return <div>Loading profile...</div>;
	}

	return (
		<Box m="10px">
			<Typography variant="h4" gutterBottom>
				User Profile
			</Typography>
			<Typography variant="body1" gutterBottom>
				Username: {profileData.userName}
			</Typography>
			<Typography variant="body1" gutterBottom>
				Email: {profileData.email}
			</Typography>
			<Typography variant="body1" gutterBottom>
				User Role: {profileData.roles}
			</Typography>
		</Box>
	);
};

export default Profile;
