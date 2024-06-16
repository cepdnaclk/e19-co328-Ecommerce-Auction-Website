import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LoginService from "./LoginServices"; // Adjust the import path as needed
import UserNavBar from "../components/User/UserNavBar";

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
		<div style={{ width: '100%' }}>
			<Box sx={{paddingTop:'60', marginTop:'1'}} className="mt-16 p-4">
				<UserNavBar />
				<div className="bg-gray-300 antialiased min-h-screen flex items-center justify-center">
					<div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6">
						<div className="flex justify-center">
						<img
							src="https://avatars0.githubusercontent.com/u/35900628?v=4"
							alt=""
							className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
						/>
						</div>

						<div className="mt-16">
						<h1 className="font-bold text-center text-3xl text-gray-900">{profileData.userName}</h1>
						<p className="text-center text-sm text-gray-400 font-medium">{profileData.roles}</p>
						<div className="my-5 px-6">
							<a
							href="#"
							className="block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-black text-white"
							>
							Connect with <span className="font-bold">{profileData.email}</span>
							</a>
						</div>
						<div className="w-full">
							<h3 className="font-medium text-gray-900 text-left px-6">Recent activities</h3>
							<div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
							<a
								href="#"
								className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
							>
								<img
								src="https://avatars0.githubusercontent.com/u/35900628?v=4"
								alt=""
								className="rounded-full h-6 shadow-md inline-block mr-2"
								/>
								Updated his status
								<span className="text-gray-500 text-xs">24 min ago</span>
							</a>

							<a
								href="#"
								className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
							>
								<img
								src="https://avatars0.githubusercontent.com/u/35900628?v=4"
								alt=""
								className="rounded-full h-6 shadow-md inline-block mr-2"
								/>
								Added new profile picture
								<span className="text-gray-500 text-xs">42 min ago</span>
							</a>

							<a
								href="#"
								className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
							>
								<img
								src="https://avatars0.githubusercontent.com/u/35900628?v=4"
								alt=""
								className="rounded-full h-6 shadow-md inline-block mr-2"
								/>
								Posted new article in <span className="font-bold">#Web Dev</span>
								<span className="text-gray-500 text-xs">49 min ago</span>
							</a>

							<a
								href="#"
								className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
							>
								<img
								src="https://avatars0.githubusercontent.com/u/35900628?v=4"
								alt=""
								className="rounded-full h-6 shadow-md inline-block mr-2"
								/>
								Edited website settings
								<span className="text-gray-500 text-xs">1 day ago</span>
							</a>

							<a
								href="#"
								className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden"
							>
								<img
								src="https://avatars0.githubusercontent.com/u/35900628?v=4"
								alt=""
								className="rounded-full h-6 shadow-md inline-block mr-2"
								/>
								Added new rank
								<span className="text-gray-500 text-xs">5 days ago</span>
							</a>
							</div>
						</div>
						</div>
					</div>
					</div>

				
			</Box>
		
		</div>
	);
};

export default Profile;
