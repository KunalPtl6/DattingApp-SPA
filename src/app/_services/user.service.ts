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
  BaseUrlForPhotos: any = 'http://localhost:5000/api/photos/';
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

  SetMainPhoto(userId: number, id: number) {
    return this.http.post(this.BaseUrlForPhotos + userId + '/photo/' + id + '/SetMainPhoto', {});
  }

  DeletePhoto(userId: number, id: number) {
    return this.http.delete(this.BaseUrlForPhotos + userId + '/photo/' + id);
  }
}
