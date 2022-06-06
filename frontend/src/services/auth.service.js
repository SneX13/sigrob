import axios from "axios";

class AuthService {
    // on login send data with POST method from form submission to API and store JWT from Browser Local Storage
    login(email, password) {
        return axios
            .post(process.env.REACT_APP_BASE_API_URL + "/login", {email, password})
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    //on logout remove JWT from Local Storage
    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();
