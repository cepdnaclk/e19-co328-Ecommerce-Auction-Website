import axios from "axios";

const API_BASE_URL = "http://localhost:9081/user/";

class UserService{
    saveBid(bid){
        return axios.post(API_BASE_URL+"bid", bid)
    }
}

export default new UserService();