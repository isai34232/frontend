import { VenderDevolucionComponent } from './components/vender-devolucion/vender-devolucion.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListProveedoresComponent } from './components/list-proveedores/list-proveedores.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { AddEditProveedoresComponent } from './components/add-edit-proveedores/add-edit-proveedores.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { ListMovimientosComponent } from './components/list-movimientos/list-movimientos.component';
import { ListComprasComponent } from './components/list-compras/list-compras.component';




export const routes: Routes = [
  {path: '', component: ListProveedoresComponent},
  {path: 'productos', component: ListProductsComponent},
  { path: 'addproducto', component: AddEditProductComponent},
  { path: 'editProducto/:id', component: AddEditProductComponent},
  { path: 'addProveedores', component: AddEditProveedoresComponent},
  { path: 'editP/:id', component: AddEditProveedoresComponent},
  { path: 'venderD/:id', component: VenderDevolucionComponent},
  { path: 'comprar/:id', component: ComprarComponent},
  { path: 'movimientos', component: ListMovimientosComponent},
  { path: 'ordenes', component: ListComprasComponent},

  { path: '**', redirectTo: '', pathMatch:'full'},
];
