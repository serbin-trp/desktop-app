import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClientsService } from '@modules/clients/data-access/clients.service';
import { IClient } from '@modules/clients/models/client.model';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmButtonDirective } from '@core/ui-kit/ui-button-helm/src';
import { HlmLabelDirective } from '@core/ui-kit/ui-label-helm/src';
import { HlmInputDirective } from '@core/ui-kit/ui-input-helm/src';
import { DocumentService } from '@modules/documents/data-access/document.service';
import { NgFor } from '@angular/common';
import { hlmH2 } from '@core/ui-kit/ui-typography-helm/src';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'create-document-page',
  templateUrl: './create-document.page.html',
  styleUrl: './create-document-page.component.scss',
  imports: [
    ReactiveFormsModule,
    BrnSelectImports,
    HlmSelectImports,
    HlmButtonDirective,
    HlmLabelDirective,

    HlmInputDirective,
    NgFor,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [ClientsService, DocumentService],
  encapsulation: ViewEncapsulation.None,
})
export class CreateDocumentPageComponent {
  h2 = hlmH2;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private clientsService = inject(ClientsService);
  private documentsService = inject(DocumentService);

  createDocumentForm: FormGroup = this.fb.group({
    date: '',
    title: '',
    executor: null,
    contractor: null,
    transactions: this.fb.array([this.fb.control(0)]),
  });

  get transactions() {
    return this.createDocumentForm.get('transactions') as FormArray;
  }

  addTransaction() {
    this.transactions.push(this.fb.control(0));
  }

  clients: IClient[] = [];

  constructor() {
    this.clientsService.getAll().then((resp) => {
      this.clients = resp;
    });
  }

  handleSubmit() {
    this.documentsService
      .create(this.createDocumentForm.getRawValue())
      .then(() => this.router.navigateByUrl('/documents'));
    toast.success('Document successfuly created!');
  }
}
