import { Route } from '@angular/router';
import { GridComponent } from '@features/grid/grid.component';

export const appRoutes: Route[] = [
  { path: 'grid', component: GridComponent },
  { path: '', redirectTo: 'grid', pathMatch: 'full' }
];
