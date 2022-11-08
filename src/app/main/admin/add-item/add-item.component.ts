import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm = new FormGroup({
    productType: new FormControl('Product'),
    name: new FormControl('SDSAD'),
    itemDescription: new FormControl('sdafasdf'),
    normalPrice: new FormControl(40000),
    corporatePrice: new FormControl(40000),
    costOfGoods: new FormControl(40000),
    itemCategory: new FormControl('d34cef6c-4553-11ed-b1d4-0aafa9949a5e'),
    itemMerk: new FormControl('59d1b336-1aae-11ec-8f60-0242ac110002'),
    itemSupplierReferenceName: new FormControl('FIKIH'),
    itemUnit: new FormControl('9b3a02a7-4877-11ed-b037-0aafa9949a5e'),
  });

  imageFile?: { link: string; file: any; name: string };

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddItemComponent>,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {}

  addItem() {
    // convert form grup to form data
    const convertFormData = new FormData();
    convertFormData.append('image', this.imageFile?.file);
    const object_data: any = this.addItemForm.value;
    for (const key in object_data) {
      convertFormData.append(key, object_data[key]);
    }

    this.itemService.addItem(convertFormData).subscribe();
  }

  imageHandler(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
