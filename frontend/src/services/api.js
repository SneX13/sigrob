import http from "../api-common";

class SystemDataService {
    getAll() {
        return http.get("/systems");
    }

    get(id) {
        return http.get(`/systems/${id}`);
    }

    create(data) {
        return http.post("/systems", data);
    }

    update(id, data) {
        return http.put(`/systems/${id}`, data);
    }

    delete(id) {
        return http.delete(`/systems/${id}`);
    }
}

export default new SystemDataService();