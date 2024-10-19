import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payments } from '@helpers/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  addPayment(payment: Payments): Observable<Payments> {
    return this.http.post<Payments>('/api/payments', payment);
  }

  getPayments(): Observable<Payments[]> {
    return this.http.get<Payments[]>('/api/payments');
  }
}
