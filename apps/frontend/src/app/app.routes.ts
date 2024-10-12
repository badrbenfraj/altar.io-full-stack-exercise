import { Route } from '@angular/router';
import { GridComponent } from '@features/grid/grid.component';
import { PaymentsComponent } from '@features/payments/payments.component';

export const appRoutes: Route[] = [
  { path: 'grid', component: GridComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: '', redirectTo: 'grid', pathMatch: 'full' }
];
