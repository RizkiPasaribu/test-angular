import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { ItemListComponent } from './admin/item-list/item-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ConfirmComponent } from './admin/dialog/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    MenuComponent,
    AboutComponent,
    AddItemComponent,
    ItemListComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MainRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  providers: [],
})
export class MainModule {}
