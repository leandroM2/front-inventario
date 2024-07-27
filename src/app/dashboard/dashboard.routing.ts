import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CategoryComponent } from '../components/category/category.component';
import { ProductosComponent } from '../components/productos/productos.component';

export const DashboardRoutes: Routes = [
  {path: '', component: DashboardComponent},
  { path: 'category', component: CategoryComponent },
  { path: 'productos', component: ProductosComponent }];
