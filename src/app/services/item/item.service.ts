import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemList } from './items-type';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http
      .get<{ _embedded: { item_list: ItemList[] } }>(
        'https://dev.xtend.my.id/api/v1/item-list?limit=10',
        {
          headers,
        }
      )
      .pipe(map(({ _embedded }) => _embedded.item_list));
  }
}
