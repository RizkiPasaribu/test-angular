import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(pageIndex: number = 1, pageSize: number = 25): Observable<any> {
    return this.http.get(
      `https://dev.xtend.my.id/api/v1/item-list?limit=${pageSize}&page=${pageIndex}`
    );
  }

  addItem(data: any) {
    return this.http.post(`https://dev.xtend.my.id/api/v1/item-list`, data);
  }

  deleteItem(data: string) {
    return this.http.delete(`https://dev.xtend.my.id/api/v1/item-list/${data}`);
  }
}
