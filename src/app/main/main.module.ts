import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { AddItemComponent } from './components/dialog/add-item/add-item.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ConfirmComponent } from './components/dialog/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { DetailComponent } from './components/dialog/detail/detail.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ItemService } from './item.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix',
      },
      {
        path: 'home',
        component: DashboardComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'detail',
        component: DetailComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    MenuComponent,
    AboutComponent,
    AddItemComponent,
    AdminComponent,
    ConfirmComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
  providers: [ItemService],
})
export class MainModule {}
