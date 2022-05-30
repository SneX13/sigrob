import axios from "axios";

const login = (email, password) => {
    return axios
        .post(process.env.REACT_APP_BASE_API_URL + "/auth/login", {
            email,
            password,
        })
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
export default {
    login,
    logout,
};