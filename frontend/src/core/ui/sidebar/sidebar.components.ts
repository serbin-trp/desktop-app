import { Component, computed, inject, signal } from '@angular/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideBarChart2, lucideFile, lucideLaugh } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  routes,
  toSidebarItems,
  SidebarRoute,
  RoutingService,
} from '@core/routing';
import { LogoComponent } from '../logo/logo.component';

type Route = SidebarRoute & { variant: 'secondary' | 'ghost' | 'default' };

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.components.html',
  styleUrl: './sidebar.components.scss',
  providers: [provideIcons({ lucideBarChart2, lucideFile, lucideLaugh })],
  imports: [
    HlmIconComponent,
    HlmButtonDirective,
    RouterLink,
    RouterLinkActive,
    LogoComponent,
  ],
})
export class AppSidebar {
  routerService = inject(RoutingService);
  routes = signal(toSidebarItems(routes));
  sidebarRoutes = computed<Route[]>(() => {
    return this.routes().map((r) => ({
      ...r,
      variant:
        r.path === '/' + this.routerService.currentRoute()?.path
          ? 'default'
          : 'ghost',
    }));
  });
}
