import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'https://inventario-nhtz.onrender.com/api'

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/productos`);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiURL}/productos/${id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiURL}/productos`, product);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/productos/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/productos/${id}`, product);
  }

  movimiento(id: number, cantidad: number, tipo: string): Observable<any> {
    const params = new HttpParams()
      .set('cantidad', cantidad)
      .set('tipo', tipo);

    return this.http.post<any>(`${this.apiURL}/productos/${id}/movimiento`, null, { params });
  }

}
