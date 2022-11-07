import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ItemService } from 'src/app/services/item/item.service';
import { lastValueFrom } from 'rxjs';
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
      this.items_list = data;
    });
  }

  items_list: ItemList[] = [];

  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
}
