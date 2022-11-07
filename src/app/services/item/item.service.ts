import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(pageIndex: number = 1, pageSize: number = 25): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get(
      `https://dev.xtend.my.id/api/v1/item-list?limit=${pageSize}&page=${pageIndex}`,
      {
        headers,
      }
    );
  }
}
