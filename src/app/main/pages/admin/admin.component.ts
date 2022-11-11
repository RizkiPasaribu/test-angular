import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '../../item.service';
import { ItemList } from '../../items-type';
import { AddItemComponent } from '../../components/dialog/add-item/add-item.component';
import { ConfirmComponent } from '../../components/dialog/confirm/confirm.component';
import { DetailComponent } from '../../components/dialog/detail/detail.component';

@Component({
  selector: 'app-admin-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  total_items: number = 0;
  items_list: ItemList[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
  // sengaja aku buat agar ketika nanti model ditutup data current page nya akan tetap ada dan tidak tereset
  currentPage: number = 0;
  pageSize: number = 0;

  constructor(
    private itemService: ItemService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog // private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items_list = data._embedded.item_list;
      this.total_items = data.total_items;
    });
  }

  pageEvent(data: any) {
    this.currentPage = data.pageIndex + 1;
    this.pageSize = data.pageSize;
    this.itemService
      .getItems('', this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.items_list = data._embedded.item_list;
      });
  }

  openDialog(uuid: string = ''): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: uuid,
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.currentPage == 0 && this.pageSize == 0) {
        this.ngOnInit();
      } else {
        this.itemService
          .getItems('', this.currentPage, this.pageSize)
          .subscribe((data) => {
            this.items_list = data._embedded.item_list;
          });
      }
    });
  }

  delete(uuid: string) {
    // confirm dialog
    const dialogdelete = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Delete Item',
        message: 'Are You Sure Deleted This Item?',
      },
    });
    dialogdelete.afterClosed().subscribe({
      next: (result) => {
        if (result == true) {
          this.itemService.deleteItem(uuid).subscribe({
            next: () => {
              if (this.currentPage == 0 && this.pageSize == 0) {
                this.ngOnInit();
              } else {
                this.itemService
                  .getItems('', this.currentPage, this.pageSize)
                  .subscribe((data) => {
                    this.items_list = data._embedded.item_list;
                  });
              }
              this._snackBar.open('Item Successfully Deleted', '', {
                duration: 3000,
                panelClass: ['text-white', 'bg-green-400'],
                verticalPosition: 'top',
              });
            },
          });
        }
      },
    });
  }

  info(uuid: string) {
    const dialogdelete = this.dialog.open(DetailComponent, {
      data: uuid,
    });
  }

  edit(uuid: string) {
    this.openDialog(uuid);
  }
}
