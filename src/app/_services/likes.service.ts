import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/Pagination';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  baseurl: any = environment.BaseAddress + 'Likes/';
  constructor(private http: HttpClient) { }

  SendLike(Id: number, RecipientId: number): Observable<any> {
    const objLikeDto: any = {};
    objLikeDto.LikerId = Id;
    objLikeDto.LikeeId = RecipientId;
    return this.http.post(this.baseurl + 'AddLikes', objLikeDto);
  }

  RemoveLikes(Id: number, RecipientId: number): Observable<any> {
    const objLikeDto: any = {};
    objLikeDto.LikerId = Id;
    objLikeDto.LikeeId = RecipientId;
    return this.http.post(this.baseurl + 'RemoveLikes', objLikeDto);
  }

  UserLikeeList(pageNumber?, itemPerPage?, Id?: number): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    const objLikeDto: any = {};
    objLikeDto.LikerId = Id;
    objLikeDto.pageNumber = pageNumber;
    objLikeDto.PageSize = itemPerPage;
    return this.http.post<User[]>(this.baseurl + 'UserLikeeList', objLikeDto, { observe: 'response'}).pipe(
      map(response => {
        paginationResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginationResult;
      })
    );
  }

  UserLikerList(pageNumber?, itemPerPage?, Id?: number): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    const objLikeDto: any = {};
    objLikeDto.LikerId = Id;
    objLikeDto.pageNumber = pageNumber;
    objLikeDto.PageSize = itemPerPage;
    return this.http.post<User[]>(this.baseurl + 'UserLikerList', objLikeDto, { observe: 'response'}).pipe(
      map(response => {
        paginationResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginationResult;
      })
    );
  }

}
