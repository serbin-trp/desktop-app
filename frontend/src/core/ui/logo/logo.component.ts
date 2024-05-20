import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { hlmH2 } from '@core/ui-kit/ui-typography-helm/src';

@Component({
  standalone: true,
  selector: 'logo',
  templateUrl: './logo.component.html',
  imports: [CommonModule],
})
export class LogoComponent {
  headerClass = hlmH2;
}
