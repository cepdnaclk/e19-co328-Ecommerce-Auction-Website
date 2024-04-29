import axios from "axios";

const API_BASE_URL = "http://localhost:9081/";

class CustomerService{
    save(user){
        return axios.post(API_BASE_URL+"register", user)
    }
}

export default new CustomerService();