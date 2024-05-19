import { Component, inject, signal } from '@angular/core';

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { lucideLaugh, lucideFile } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { hlmH1 } from '@core/ui-kit/ui-typography-helm/src';
import { CommonModule } from '@angular/common';
import { ClientsService } from '@modules/clients/data-access/clients.service';
import { DocumentService } from '@modules/documents/data-access/document.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.scss',
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,

    HlmIconComponent,
    HlmButtonDirective,
    CommonModule,
    RouterLink,
  ],

  providers: [provideIcons({ lucideLaugh, lucideFile })],
})
export class StatisticsPageComponent {
  h1 = hlmH1;

  private cS = inject(ClientsService);
  private dS = inject(DocumentService);

  constructor() {
    this.cS.getAll().then((resp) => this.amountOfClient.set(resp.length));

    this.dS.getAll().then((resp) => this.amountOfDocuments.set(resp.length));
  }

  amountOfClient = signal<number>(0);
  amountOfDocuments = signal<number>(0);
}
