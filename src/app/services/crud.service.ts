import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const baseUrl = "https://todolist-datacake.herokuapp.com/tasks/";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(baseUrl + id);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(baseUrl + id, data);
  }
}
