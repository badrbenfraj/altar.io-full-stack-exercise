import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GridService {
  constructor(protected http: HttpClient) {}

  getGrid(bias: string): Observable<string[][]> {
    let params = new HttpParams();
    if (bias?.length === 1) {
      params = params.set('bias', bias);
    }
    return this.http.get<string[][]>('/api/grid', { params });
  }

  getSecretCode(grid: string[][]): Observable<string> {
    return this.http.post<string>('/api/grid/code', grid);
  }
}
