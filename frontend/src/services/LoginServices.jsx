import axios from "axios";

const API_URL = "http://localhost:9081";

const login = (user) => {
	console.log(user);
	return axios.post(API_URL + "/login", user).then((response) => {
		if (response.data.accessToken) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}

		return response.data;
	});
};

const logout = () => {
	localStorage.removeItem("user");
};
const getUserToken = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return user ? user.accessToken : null;
};

const getUserName = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return user ? user.userName : null;
};

const isLoggedIn = () => {
	return !!localStorage.getItem("user");
};

const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = getUserToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		const userName = getUserName();
		if (userName) {
			config.headers.userName = userName;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
const LoginService = {
	login,
	logout,
	isLoggedIn,
	getUserName,
	axiosInstance, // Exporting axios instance for general use
};

export default LoginService;
