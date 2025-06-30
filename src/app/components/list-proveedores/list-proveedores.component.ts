import { RouterModule } from '@angular/router';
import { ProveedorService } from './../../services/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
import { ToastrService, provideToastr } from 'ngx-toastr';


@Component({
  selector: 'app-list-proveedores',
  imports: [RouterModule, ProgressBarComponent, CommonModule],
  templateUrl: './list-proveedores.component.html',
  styleUrl: './list-proveedores.component.css'
})
export class ListProveedoresComponent implements OnInit{
  proveedores: any[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private proveedorService: ProveedorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores(): void {
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

  deleteProveedor(id: number){
    this.proveedorService.deleteProveedor(id).subscribe({
      next: () => {
      this.obtenerProveedores();
      this.toastr.warning('El proveedor fue eliminado con exito', 'Producto eliminado');
      },
      error: (err) => {
                window.location.reload();
        console.error('Error eliminando proveedor:', err)

      }    });

  }
}
