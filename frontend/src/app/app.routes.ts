import { Routes } from '@angular/router';
import { toRouterRoutes, routes as AuthorizedRoutes } from '@core/routing';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@layout/default/default-layout.component').then(
        (m) => m.DefaultLayoutComponent,
      ),
    children: [...toRouterRoutes(AuthorizedRoutes)],
  },
];
