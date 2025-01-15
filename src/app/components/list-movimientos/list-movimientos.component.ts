import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-movimientos',
  imports: [CommonModule],
  templateUrl: './list-movimientos.component.html',
  styleUrl: './list-movimientos.component.css'
})
export class ListMovimientosComponent {
  ordenes: any[] = [];
    constructor(private ordenService: OrdenesService, private toastr: ToastrService) { }

    ngOnInit(): void {
      this.obtenerOrden();
    }
    obtenerOrden(){
        this.ordenService.getMovimientos().subscribe(
          (response) => {
            this.ordenes = response;
          },
          (error) => {
            console.error('Error al obtener las ordenes:', error);
          }
        );
    }
  trackById(index: number, item: any): number {
    return item.id;
  }
}
