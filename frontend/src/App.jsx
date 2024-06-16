import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { blue, cyan, indigo } from "@mui/material/colors";
import SellerDashBoard from "./components/seller/DashBoard";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Listings from "./components/User/Listings";
import CreateListing from "./components/seller/CreateListing";
import OneListing from "./components/User/OneListing";
import Home from "./components/User/Home";
import Category from "./components/User/Category";
import Profile from "./services/Profile";

const lightTheme = createTheme({
	palette: {
		primary: blue,
		secondary: indigo,
	},
});

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup props="signup" />} />
					<Route path="/login" element={<Signup props="login" />} />
					<Route path="/listings" element={<Listings />} />
					<Route path="/category" element={<Category />} />
					<Route element={<RequireAuth allowedRoles="ROLE_USER" />}>
						<Route path="/profile" element={<Profile />} />
						<Route path="/listing" element={<OneListing />} />
					</Route>
					//potected route
					<Route element={<RequireAuth allowedRoles="ROLE_SELLER" />}>
						<Route path="/seller/dashboard" element={<SellerDashBoard />} />
						<Route path="/seller/createListing" element={<CreateListing />} />
					</Route>
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
