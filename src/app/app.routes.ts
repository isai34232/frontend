import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListProveedoresComponent } from './components/list-proveedores/list-proveedores.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { AddEditProveedoresComponent } from './components/add-edit-proveedores/add-edit-proveedores.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

export const routes: Routes = [
  {path: '', component: ListProveedoresComponent},
  {path: 'productos', component: ListProductsComponent},
  { path: 'addProducto', component: AddEditProductComponent},
  { path: 'editProducto/:id', component: AddEditProductComponent},
  { path: 'addProveedores', component: AddEditProveedoresComponent},
  { path: 'editP/:id', component: AddEditProveedoresComponent},
  { path: '**', redirectTo: '', pathMatch:'full'},
];
