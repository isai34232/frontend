export interface Product {
  id_producto?: number;
  nombre: string;
  descripcion: string;  
  urlImagen?: string;
  idCategoria: number;
  id_proveedor: number;
  precioCompra: number;
  precioVenta: number;
  stock: number;
}
