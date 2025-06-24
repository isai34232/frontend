import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Proveedor } from '../interfaces/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiURL = 'https://back-wqa2.onrender.com/api/proveedores';

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  deleteProveedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateProveedor(id: number, proveedor: Proveedor): Observable<void>{
    return this.http.put<void>(`${this.apiURL}/${id}`, proveedor).pipe(
      catchError(this.handleError)
    );
  }

  saveProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiURL, proveedor).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
