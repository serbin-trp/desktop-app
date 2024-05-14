import { Routes } from '@angular/router';
import { BaseRoute, SidebarRoute } from './router';

export function toRouterRoutes(routes: Array<BaseRoute>): Routes {
  return routes.map((el) => ({
    path: el.path,
    loadComponent: el.component,
    data: {
      name: el.title,
    },
  }));
}

export function toSidebarItems(routes: Array<BaseRoute>): SidebarRoute[] {
  return routes.map((el) => ({
    path: '/' + el.path,
    title: el.title,
    icon: el.icon,
  }));
}
