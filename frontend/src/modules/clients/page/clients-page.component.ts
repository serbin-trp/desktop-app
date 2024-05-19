import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreateClientModal } from './create/create-client-modal.component';
import { ClientsService } from '../data-access/clients.service';
import { CommonModule } from '@angular/common';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import {
  BrnContextMenuTriggerDirective,
  BrnMenuTriggerDirective,
} from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { HlmButtonDirective } from '@core/ui-kit/ui-button-helm/src';
import { HlmIconComponent } from '@core/ui-kit/ui-icon-helm/src';
import { provideIcons } from '@ng-icons/core';
import {
  lucideTrash,
  lucideMoreVertical,
  lucideUser,
  lucideFile,
  lucidePlus,
} from '@ng-icons/lucide';
import { toast } from 'ngx-sonner';
import { IClient } from '../models/client.model';

@Component({
  standalone: true,
  selector: 'clients-page',
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.scss',
  imports: [
    RouterLink,
    HlmButtonDirective,
    CreateClientModal,
    CommonModule,
    ClipboardModule,

    HlmCaptionComponent,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
    HlmIconComponent,

    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    HlmSubMenuComponent,
    BrnMenuTriggerDirective,
    BrnContextMenuTriggerDirective,
  ],
  providers: [
    ClientsService,
    provideIcons({
      lucideTrash,
      lucideMoreVertical,
      lucideUser,
      lucideFile,
      lucidePlus,
    }),
  ],
})
export class ClientsPageComponent {
  isModalOpen = signal(false);
  handleModalClick = () => this.isModalOpen.update((v) => !v);
  clientService = inject(ClientsService);
  clipboard = inject(Clipboard);
  constructor() {
    this.clients$ = this.clientService.getAll();
  }
  clients$: Promise<IClient[]>;

  loadClients() {
    this.clients$ = this.clientService.getAll();
  }

  handleCreate() {
    this.loadClients();
    toast.success("Client's has been created!");
  }

  handleDelete(id: number) {
    this.clientService.delete(id).then(() => this.loadClients());
    toast.info("Client's has been deleted!");
  }
  copyToClipboard(value: string) {
    this.clipboard.copy(value);
    toast.success("Client's name has been copied!");
  }
}
