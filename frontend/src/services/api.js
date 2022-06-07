import http from "./api-common";

class DataService {
    getAllSystems() {
        return http.get("/systems/");
    }

    getSystem(id) {
        return http.get(`/systems/${id}/`);
    }

    createSystem(data) {
        return http.post("/systems/", data);
    }

    updateSystem(id, data) {
        return http.put(`/systems/${id}/`, data);
    }

    deleteSystem(id) {
        return http.delete(`/systems/${id}/`);
    }

    getAllUsers() {
        return http.get("/users/");
    }

    getUser(id) {
        return http.get(`/users/${id}/`);
    }
}

export default new DataService();