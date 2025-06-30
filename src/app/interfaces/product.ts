export interface Product {
  id_producto?: number;
  nombre: string;
  urlImagen: string;
  descripcion: string;
  idCategoria: number;
  id_proveedor: number;
  precioCompra: number;
  precioVenta: number;
  stock: number;
}
