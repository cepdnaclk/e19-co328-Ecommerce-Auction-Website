import axios from "axios";

const API_URL = "http://localhost:9081";

const login = (user) => {
    console.log(user);
  return axios
    .post(API_URL + "/login", 
     user
)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};



const LoginService = {
  login,
  logout
  
};

export default LoginService;