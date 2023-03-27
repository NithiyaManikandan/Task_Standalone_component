import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../model/user_model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  formData: string[] = [];
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get<User[]>(environment.apiUrl + `/user`);
  }
  getColumn() {
    return this.http.get<string[]>(environment.apiUrl + `/column`);
  }
  getUserById(id: number) {
    return this.http.get<User[]>(environment.apiUrl + `/user/${id}`);
  }
  updateUserData(data: any) {
    return this.http.put<User[]>(environment.apiUrl + `/user/${data.id}`, data);
  }
  deleteUser(id: number) {
    return this.http.delete<User[]>(environment.apiUrl + `/user/${id}`);
  }
  postUserData(data: any) {
    return this.http.post<User[]>(environment.apiUrl + `/user`, data);
  }
  checkId(id: number) {
    return this.http.get<User[]>(environment.apiUrl + `/user`).pipe(
      map((res) => {
        return res.find((ele) => ele.id == id);
      })
    );
  }
}
