import http from '../http-commom';

class EstabsDataService {
  getAll() {
    return http.get("/estabs");
  }

  get(id) {
    return http.get(`/estabs/${id}`);
  }

  create(data) {
    return http.post("/estabs", data);
  }

  update(id, data) {
    return http.put(`/estabs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/estabs/${id}`);
  }

  deleteAll() {
    return http.delete(`/estabs`);
  }

  findByTitle(name) {
    return http.get(`/estabs?name=${name}`);
  }
}

export default new EstabsDataService();