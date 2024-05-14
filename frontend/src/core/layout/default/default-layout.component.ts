import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebar } from '@ui/sidebar/sidebar.components';
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';
import { RoutingService } from '@core/routing';
import { CommonModule } from '@angular/common';
import { hlmH1, hlmH3 } from '@core/ui-kit/ui-typography-helm/src';

@Component({
  standalone: true,
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  imports: [RouterOutlet, AppSidebar, HlmScrollAreaComponent, CommonModule],
})
export class DefaultLayoutComponent {
  routingService = inject(RoutingService);
  headerClass = hlmH3;
}
