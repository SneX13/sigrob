import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_API_URL;

class UserService {

    getUserDashboard() {
        return axios.get(API_URL + '/user-dashboard', {headers: authHeader()});
    }

    getAdminDashboard() {
        return axios.get(API_URL + '/admin-dashboard', {headers: authHeader()});
    }
}

export default new UserService();