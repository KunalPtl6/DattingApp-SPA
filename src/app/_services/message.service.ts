import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/Message';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseurl: any = environment.BaseAddress + 'messages/';
  constructor(private http: HttpClient) { }

  getMesage(Id: number, page?, itemPerPage?, messageContainer?): Observable<PaginationResult<Message[]>> {
    const paginationResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);
    if (page != null && itemPerPage != null) {
      params = params.append('PageNumber', page);
      params = params.append('PageSize', itemPerPage);
    }
    return this.http.get<Message[]>(this.baseurl + Id + '/Message/GetMessageForUser/', { observe: 'response', params })
    .pipe(
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
