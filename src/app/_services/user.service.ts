import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl: any = environment.BaseAddress + 'Datting/';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + 'GetUserList');
  }

  getUser(Id: number): Observable<User> {
    return this.http.get<User>(this.baseurl + 'GetUserById/' + Id);
  }

  updateUser(id: number, objUser: User) {
    return this.http.put(this.baseurl + 'UpdateUser/' + id, objUser);
  }

}
