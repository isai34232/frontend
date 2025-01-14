import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ListProveedoresComponent } from "./components/list-proveedores/list-proveedores.component";
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent , RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
