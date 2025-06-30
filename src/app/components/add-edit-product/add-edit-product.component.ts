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
  selectedImage: File | null = null;
  imagenError: string = '';




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


  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file.size > 2 * 1024 * 1024) {
      this.imagenError = 'La imagen no debe superar los 2MB.';
      this.selectedImage = null;
    } else {
      this.imagenError = '';
      this.selectedImage = file;
    }
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

async uploadImageToImgbb(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=58091146e7413f8d670c5caf6c6e4b42`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.data.url;
}


async addProducto() {
  if (this.form.invalid) {
    this.toastr.error('Por favor llena todos los campos correctamente', 'Error');
    return;
  }

  this.loading = true;

  let imageUrl = '';

  try {
    if (this.selectedImage) {
        imageUrl = await this.uploadImageToImgbb(this.selectedImage);
    }
    console.log("img")
    console.log(imageUrl)
    const producto: Product = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      idCategoria: Number(this.form.value.categoria),
      id_proveedor: Number(this.form.value.proveedor),
      precioCompra: this.form.value.precioCompra,
      precioVenta: this.form.value.precioVenta,
      stock: this.form.value.stock,
      urlImagen: imageUrl
    };

    if (this.id != 0) {
      producto.id_producto = this.id;
      await this.productoService.updateProduct(this.id, producto).toPromise();
      this.toastr.info(`El producto ${producto.nombre} fue actualizado con éxito`, 'Producto actualizado');
    } else {
      await this.productoService.saveProduct(producto).toPromise();
      this.toastr.success(`El producto ${producto.nombre} fue agregado con éxito`, 'Producto agregado');
    }

    this.router.navigate(['/productos']);
  } catch (error: any) {
    this.toastr.error(error.message || 'Error al guardar el producto', 'Error');
  } finally {
    this.loading = false;
  }
}



/* funcion antigua 
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
*/

  trackById(index: number, proveedor: any): number {
    return proveedor.id;
  }




}
