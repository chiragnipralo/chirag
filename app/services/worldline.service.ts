import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldlineService {

  private apiUrl = 'https://payment.preprod.direct.worldline-solutions.com/v2';

  constructor(private http: HttpClient) {}

  makePayment(orderId: string, amount: number) {
    return this.http.post(`${this.apiUrl}/payment`, { orderId, amount });
  }
}
