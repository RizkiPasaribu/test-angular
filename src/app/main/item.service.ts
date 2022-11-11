import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(
    uuid: string = '',
    pageIndex: number = 1,
    pageSize: number = 25
  ): Observable<any> {
    if (uuid) {
      return this.http.get(`/api/v1/item-list/${uuid}`);
    }
    return this.http.get(
      `/api/v1/item-list?limit=${pageSize}&page=${pageIndex}`
    );
  }

  addItem(data: any) {
    return this.http.post(`/api/v1/item-list`, data);
  }

  editItem(data: any, uuid: string) {
    return this.http.patch(`/api/v1/item-list/${uuid}`, data);
  }

  deleteItem(data: string) {
    return this.http.delete(`/api/v1/item-list/${data}`);
  }
}
