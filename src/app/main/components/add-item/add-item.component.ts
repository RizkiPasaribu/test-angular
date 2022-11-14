import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyLayoutService } from 'src/app/shared/layout/my-layout/my-layout.service';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  addItemForm = new FormGroup({
    productType: new FormControl(''),
    name: new FormControl(''),
    itemDescription: new FormControl(''),
    normalPrice: new FormControl(null),
  });

  imageFile?: { link: string; file: any; name: string };

  constructor(
    private myLayout: MyLayoutService,
    public dialogRef: MatDialogRef<AddItemComponent>,
    private itemService: ItemService,
    // get value from item list component and pass to this dialog
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.itemService.getItems(this.data).subscribe({
      next: (result) => {
        this.addItemForm.patchValue({
          name: result.name,
          productType: result.productType,
          itemDescription: result.itemDescription,
          normalPrice: result.normalPrice,
        });
      },
    });
  }

  submit() {
    const convertFormData = new FormData();
    // manual code because this fields can't input by user
    convertFormData.append('corporatePrice', '40000');
    convertFormData.append('costOfGoods', '40000');
    convertFormData.append(
      'itemCategory',
      'd34cef6c-4553-11ed-b1d4-0aafa9949a5e'
    );
    convertFormData.append('itemMerk', '59d1b336-1aae-11ec-8f60-0242ac110002');
    convertFormData.append('itemSupplierReferenceName', 'FIKIH');
    convertFormData.append('itemUnit', '9b3a02a7-4877-11ed-b037-0aafa9949a5e');

    // convert form grup to form data
    if (this.imageFile) {
      convertFormData.append('image', this.imageFile?.file);
    }

    const object_data: any = this.addItemForm.value;
    for (const key in object_data) {
      convertFormData.append(key, object_data[key]);
    }

    // edit data
    if (this.data) {
      this.itemService.editItem(convertFormData, this.data).subscribe({
        next: () => {
          this.myLayout.mySnackbar('Successfully Edited Item ');
        },
      });
    }
    // add data
    else {
      this.itemService.addItem(convertFormData).subscribe({
        next: () => {
          this.myLayout.mySnackbar('Item Successfully Added');
        },
        complete: () => {
          //reset field
          this.addItemForm.reset();
          this.imageFile = {
            link: '',
            file: null,
            name: '',
          };
        },
      });
    }
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
