import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { User } from '../model/user_model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  formData: string[] = [];
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get<User[]>(`http://localhost:3000/user`);
  }
  getColumn() {
    return this.http.get<string[]>(`http://localhost:3000/column`);
  }
  getUserById(id: number) {
    return this.http.get<User[]>(`http://localhost:3000/user/${id}`);
  }
  updateUserData(data: any) {
    return this.http.put<User[]>(`http://localhost:3000/user/${data.id}`, data);
  }
  deleteUser(id: number) {
    return this.http.delete<User[]>(`http://localhost:3000/user/${id}`);
  }
  postUserData(data: any) {
    return this.http.post<User[]>(`http://localhost:3000/user`, data);
  }
  checkId(id: number) {
    return this.http.get<User[]>(`http://localhost:3000/user`).pipe(
      map((res) => {
        return res.find((ele) => ele.id == id);
      })
    );
  }
}
