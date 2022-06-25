import http from "./api-common";

class SystemDataService {

    getSystemById(id) {
        return http.get(`http://127.0.0.1:8000/api/systems/${id}`);
    }

    getSystemWithComponents(id) {
        return http.get('http://127.0.0.1:8000/api/systems/systemId/', {
            params: {
                id:id
            }
        });
    }
}

export default new SystemDataService();