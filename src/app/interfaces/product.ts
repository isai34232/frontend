export interface Product {
  id_producto?: number;
  nombre: string;
  descripcion: string;
  id_categoria: number;
  id_proveedor: number;
  precio_compra: number;
  precio_venta: number;
  stock: number;
}
