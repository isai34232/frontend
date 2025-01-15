import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../services/product.service';
import { ProgressBarComponent } from './../../shared/progress-bar/progress-bar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vender-devolucion',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './vender-devolucion.component.html',
  styleUrl: './vender-devolucion.component.css'
})
export class VenderDevolucionComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;

  constructor(
    private productoService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      cantidad: [''],
      tipo: ['']
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

  addMovimiento() {
    this.loading = true;

    const cantidad = this.form.value.cantidad;
    const tipo = this.form.value.tipo;

    this.productoService.movimiento(this.id, cantidad, tipo).subscribe(() => {
      this.toastr.info('Movimiento valido', 'Movimiento actualizado');
      this.loading = false;
      this.router.navigate(['/productos']);
    }, (error) => {
      this.toastr.error('Stock insuficiente', 'Error');
      this.loading = false;
    });
  }

}
