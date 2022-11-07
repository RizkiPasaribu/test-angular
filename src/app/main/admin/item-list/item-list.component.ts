import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemService } from 'src/app/services/item/item.service';
import { ItemList } from 'src/app/services/item/items-type';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items_list = data._embedded.item_list;
      this.total_items = data.total_items;
    });
  }

  pageEvent(data: any) {
    this.itemService
      .getItems(data.pageIndex + 1, data.pageSize)
      .subscribe((data) => {
        this.items_list = data._embedded.item_list;
      });
  }

  total_items: number = 0;
  items_list: ItemList[] = [];

  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
}
