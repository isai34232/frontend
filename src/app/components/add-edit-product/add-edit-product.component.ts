import { CategoriaService } from './../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ProveedorService } from '../../services/proveedor.service';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit{
  form: FormGroup;
  proveedores: any[] = [];
  categorias: any[] = [];
  errorMessage: string = '';
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';



  constructor(private router: Router,
    private proveedorService: ProveedorService, private fb: FormBuilder, private cService: CategoriaService, private aRouter: ActivatedRoute, private productoService: ProductService, private toastr: ToastrService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precioCompra: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]],
      precioVenta: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      proveedor: ['', Validators.required],
      stock: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerProveedores();
    this.obtenerCategorias();

    if(this.id != 0){
      this.operacion = 'Editar';
      this.getProducto(this.id)
    }
  }

  obtenerProveedores(): void {
    this.loading = true;
    this.proveedorService.getProveedores().subscribe({
        next: (data) => {

          this.proveedores = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.loading = false;
        }
    });
  }

  getProducto(id: number) {
    this.loading = true;
    this.productoService.getProduct(id).subscribe({
      next: (data) => {
        if (data) {
          this.loading = false;
          this.form.setValue({
            nombre: data.nombre,
            precioCompra: data.precioCompra,
            precioVenta: data.precioVenta,
            descripcion: data.descripcion,
            categoria: data.categoria ? data.categoria.idCategoria : '',
            proveedor: data.proveedor ? data.proveedor.id_proveedor : '',
            stock: data.stock
          });
        } else {
          this.errorMessage = 'Producto no encontrado';
          this.loading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }


  obtenerCategorias(): void {
    this.loading = true;
    this.cService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  addProducto(){
    const producto: Product = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      idCategoria:  Number(this.form.value.categoria),
      id_proveedor: Number(this.form.value.proveedor),
      precioCompra: this.form.value.precioCompra,
      precioVenta: this.form.value.precioVenta,
      stock: this.form.value.stock
    }

    this.loading = true;
    if(this.id != 0){
      producto.id_producto = this.id;
      this.productoService.updateProduct(this.id, producto).subscribe(() => {
        this.toastr.info(`El producto ${producto.nombre}  fue actualizado con exito`, 'Producto actualizado');
        this.loading = false;
        this.router.navigate(['/productos']);
      })
    } else{
      this.productoService.saveProduct(producto).subscribe(() => {
      this.toastr.success(`El producto ${producto.nombre}  fue agregado con exito`, 'Producto agregado');
      this.loading = false;
      this.router.navigate(['/productos']);
      })
    }
  }

  trackById(index: number, proveedor: any): number {
    return proveedor.id;
  }




}
