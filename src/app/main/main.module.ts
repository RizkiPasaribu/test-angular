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
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MainRoutingModule,
    MatTableModule,
  ],
})
export class MainModule {}
