import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private apiURL = 'https://back-wqa2.onrender.com/api'

  constructor(private http:HttpClient) { }

  getOrdenes(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/ordenes-compra`);
  }

  getMovimientos(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/movimientos`);
  }
}
