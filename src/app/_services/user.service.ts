import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginationResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl: any = environment.BaseAddress + 'Datting/';
  BaseUrlForPhotos: any = 'http://localhost:5000/api/photos/';
  constructor(private http: HttpClient) { }

  getUsers(pageNumber?, itemPerPage?, filterCriteria?: any): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    let params = new HttpParams();
    if (pageNumber != null && itemPerPage != null) {
      params = params.append('PageNumber', pageNumber);
      params = params.append('PageSize', itemPerPage);
    }
    if (filterCriteria !== undefined) {
      params = params.append('MinAge', filterCriteria.minAge == null ? 18 : filterCriteria.minAge);
      params = params.append('MaxAge', filterCriteria.maxAge == null ? 99 : filterCriteria.maxAge);
      params = params.append('Gender', filterCriteria.gender);
      params = params.append('orderBy', filterCriteria.orderBy == null ? 'lastActive' : filterCriteria.orderBy);
    }
    return this.http.get<User[]>(this.baseurl + 'GetUserList', { observe: 'response', params }).pipe(
      map(response => {
        paginationResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginationResult;
      })
    );
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
