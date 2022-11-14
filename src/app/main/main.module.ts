import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { AddItemComponent } from './components/add-item/add-item.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { DetailComponent } from './components/detail/detail.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ItemService } from './item.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MyLayoutComponent } from '../shared/layout/my-layout/my-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MyLayoutComponent,
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
    ],
  },
];
@NgModule({
  declarations: [
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  providers: [ItemService],
})
export class MainModule {}
