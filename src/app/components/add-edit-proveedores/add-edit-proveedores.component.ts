import { Proveedor } from './../../interfaces/proveedor';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../services/proveedor.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-edit-proveedores',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './add-edit-proveedores.component.html',
  styleUrl: './add-edit-proveedores.component.css'
})
export class AddEditProveedoresComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _proveedorService: ProveedorService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
    ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(this.id)
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar';
      this.getProveedor(this.id);
    }
  }

  getProveedor(id: number){
    this.loading = true;
    this._proveedorService.getProveedor(id).subscribe((data:Proveedor) => {
       console.log(data);
       this.loading = false;
       this.form.setValue({
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email
       })
    })
  }

  addProveedor(){
    const proveedor: Proveedor= {
      nombre: this.form.value.nombre,
      telefono: this.form.value.telefono,
      email: this.form.value.email
    }
    this.loading = true;
    if(this.id != 0){

      proveedor.id_proveedor = this.id;
      this._proveedorService.updateProveedor(this.id, proveedor).subscribe(() => {
      this.toastr.info(`El proveedor ${proveedor.nombre} fue actualizado con exito`, 'Proveedor actualizado');
      this.loading = false;
      this.router.navigate(['/']);
      })
    }else{
      this._proveedorService.saveProveedor(proveedor).subscribe(() => {
      this.toastr.success(`El proveedor ${proveedor.nombre} fue agregado con exito`, 'Proveedor agregado');
      this.loading = false;
      this.router.navigate(['/']);
      })
    }
  }
}
