import { Route } from '@angular/router';
import { GridComponent } from '@features/grid/grid.component';
import { PaymentsComponent } from '@features/payments/payments.component';
import { AuthGuard } from '@app/core/auth/auth.guard';

export const appRoutes: Route[] = [
  { path: 'grid', component: GridComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: '', redirectTo: 'grid', pathMatch: 'full' }
];
