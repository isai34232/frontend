import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comprar',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './comprar.component.html',
  styleUrl: './comprar.component.css'
})
export class ComprarComponent implements OnInit{
  form: FormGroup;
  loading: boolean = false;
  id: number;
  idProveedor: number = 0;

  constructor(
    private productoService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      cantidad: [''],
      total: ['']
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    this.productoService.getProduct(this.id).subscribe(
      (product) => {
        this.idProveedor = product.proveedor.id_proveedor;
      },
      (error) => {
        this.toastr.error('Error al cargar los detalles del producto.', 'Error');
      }
    );
  }

  addCompra(): void {
    if (this.form.invalid) {
      this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error');
      return;
    }

    const { cantidad, total } = this.form.value;
    this.loading = true;


    this.productoService.compra(this.id, cantidad, this.idProveedor, total)
      .subscribe(
        (response) => {
          this.loading = false;
          this.toastr.success('Compra realizada con éxito!', 'Éxito');
          this.router.navigate(['/productos']);
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Hubo un error al realizar la compra.', 'Error');
        }
      );
  }


}
