import { Component, computed, inject, model, output } from '@angular/core';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';

import { ClientsService } from '@modules/clients/data-access/clients.service';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'create-client-modal',
  templateUrl: './create-client-modal.component.html',
  imports: [
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    ReactiveFormsModule,
  ],
  providers: [ClientsService, FormBuilder],
})
export class CreateClientModal {
  open = model(false);
  modalState = computed(() => (this.open() ? 'open' : 'closed'));
  onClose = () => {
    this.open.set(false);
    this.createClientForm.reset();
  };
  onCreate = output();

  clientsService = inject(ClientsService);
  private fb = inject(FormBuilder);

  createClientForm = this.fb.nonNullable.group({
    firstName: [''],
    lastName: [''],
    fathersName: [''],
  });

  handleSubmit() {
    const value = this.createClientForm.getRawValue();
    this.clientsService.create(value).then(() => this.onCreate.emit());
    this.onClose();
  }
}
