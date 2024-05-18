import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, shareReplay } from 'rxjs';
import { routes } from './router';
import { toSidebarItems } from './utils';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  public currentRouteEvent = signal<NavigationEnd | null>(null);

  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        shareReplay(1),
      )
      .subscribe((ev) => {
        this.currentRouteEvent.set(ev as NavigationEnd);
      });
  }

  public currentRoute = computed(() => {
    return routes.find((r) => '/' + r.path === this.currentRouteEvent()?.url);
  });
}
