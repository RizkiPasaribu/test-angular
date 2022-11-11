import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from '../../../item.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  detailItem?: any;

  ngOnInit(): void {
    this.itemService.getItems(this.data).subscribe({
      next: (result) => {
        this.detailItem = result;
      },
    });
  }

  coloseDialog() {
    this.dialogRef.close();
  }
}
