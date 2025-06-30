import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-movimientos',
  imports: [CommonModule],
  templateUrl: './list-movimientos.component.html',
  styleUrl: './list-movimientos.component.css'
})
export class ListMovimientosComponent implements OnInit {
  ordenes: any[] = [];

  // Tipos válidos (puedes editarlos si cambian)
  tiposValidos = {
    venta: 'venta',
    devolucion: 'devolución' // usa acento si así viene del backend
  };

  constructor(
    private ordenService: OrdenesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerOrden();
  }

  obtenerOrden() {
    this.ordenService.getMovimientos().subscribe(
      (response) => {
        this.ordenes = response;
        console.log('Movimientos recibidos:', this.ordenes);
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

  generatePDF(tipo: 'venta' | 'devolucion') {
  const doc = new jsPDF();

  // Normalizamos el tipo a comparar
  const tipoEsperado = tipo.toUpperCase(); // 'VENTA' o 'DEVOLUCION'

  // Filtrar por coincidencia exacta con mayúsculas
  const movimientosFiltrados = this.ordenes.filter((m) =>
    m.tipoMovimiento?.toUpperCase() === tipoEsperado
  );

  if (movimientosFiltrados.length === 0) {
    this.toastr.warning(`No hay movimientos del tipo ${tipo}`);
    return;
  }

  const tabla = movimientosFiltrados.map((m) => [
    m.cantidad,
    new Date(m.fecha).toLocaleDateString(),
    m.tipoMovimiento
  ]);

  const totalCantidad = movimientosFiltrados.reduce(
    (sum, m) => sum + m.cantidad,
    0
  );

  doc.text(
    `Reporte de ${tipo === 'venta' ? 'Ventas' : 'Devoluciones'}`,
    14,
    20
  );

  autoTable(doc, {
    head: [['Cantidad', 'Fecha de Entrega', 'Tipo']],
    body: tabla,
    startY: 30
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 40;

  doc.text(`Total de registros: ${movimientosFiltrados.length}`, 14, finalY + 10);
  doc.text(`Cantidad total: $${totalCantidad}`, 14, finalY + 20);

  doc.save(`reporte_${tipo}.pdf`);
}

}
