import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-compras',
  imports: [CommonModule],
  templateUrl: './list-compras.component.html',
  styleUrl: './list-compras.component.css'
})
export class ListComprasComponent implements OnInit {
  ordenes: any[] = [];
  constructor(private ordenService: OrdenesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerOrden();
  }
  obtenerOrden(){
      this.ordenService.getOrdenes().subscribe(
        (response) => {
          this.ordenes = response;
        },
        (error) => {
          console.error('Error al obtener las ordenes:', error);
          window.location.reload();
        }
      );
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
