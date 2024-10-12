import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Code, Grid } from '@helpers/models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GridService {
  constructor(protected http: HttpClient) {}

  getGrid(bias?: Code): Observable<Grid> {
    let params = new HttpParams();
    if (bias?.length === 1) {
      params = params.set('bias', bias);
    }
    return this.http.get<Grid>('/api/grid', { params });
  }

  getSecretCode(grid: Grid): Observable<Code> {
    return this.http.post<Code>('/api/grid/code', grid);
  }
}
