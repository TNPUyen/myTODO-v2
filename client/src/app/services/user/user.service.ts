import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + '/users';

  currentUserInfo!: UserModel;
  user!: User;

  constructor(private http: HttpClient,) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}/all`) as Observable<UserModel[]>;
  }

  getUserByEmail(userEmail: string | null) {
    return this.http.get(`${this.apiUrl}/byEmail?email=${userEmail}`) as Observable<UserModel>;
  }


  getUserById(id: string | null) {
    return this.http.get(`${this.apiUrl}/${id}`) as Observable<UserModel>;
  }

  createUser(user: User) {
    return this.http.post(`${this.apiUrl}/login`, user) as Observable<UserModel>;
  }
  
}
