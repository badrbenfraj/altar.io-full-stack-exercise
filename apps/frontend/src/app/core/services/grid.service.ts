import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GridService {
  constructor(protected http: HttpClient) {}

  getGrid(): Observable<string[][]> {
    return this.http.get<string[][]>('/api/grid');
  }

  getSecretCode(grid: string[][]): Observable<string> {
    return this.http.post<string>('/api/grid/code', grid);
  }
}
