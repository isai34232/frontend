import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-products',
  imports: [RouterModule, CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
    productos: any[] = [];
    errorMessage: string = '';


    constructor(private productService: ProductService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.obtenerProductos();
    }

    obtenerProductos(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error: HttpErrorResponse) => {
        window.location.reload();
        this.errorMessage = error.message;
      }
    });
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe({
      next: () => {
      this.obtenerProductos();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
      },
      error: (err) => console.error('Error eliminando producto:', err)
    })
  }

  trackById(index: number, producto: any): number {
    return producto.id_producto;
  }

}
