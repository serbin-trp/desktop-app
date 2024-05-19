import { Component, inject, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IClient } from '@modules/clients/models/client.model';
import { filter, switchMap } from 'rxjs';
import { ClientsService } from '@modules/clients/data-access/clients.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HlmInputDirective } from '@core/ui-kit/ui-input-helm/src';
import { HlmButtonDirective } from '@core/ui-kit/ui-button-helm/src';
import { HlmLabelDirective } from '@core/ui-kit/ui-label-helm/src';
import { hlmH2, hlmH3 } from '@core/ui-kit/ui-typography-helm/src';

@Component({
  standalone: true,
  selector: 'edit-client-page',
  templateUrl: './edit-client-page.component.html',
  styleUrl: './edit-client-page.component.scss',
  providers: [ClientsService],
  imports: [
    ReactiveFormsModule,
    HlmInputDirective,
    HlmButtonDirective,
    HlmLabelDirective,
  ],
})
export class EditClientPageComponent {
  h2 = hlmH2;
  h3 = hlmH3;
  route = inject(ActivatedRoute);
  router = inject(Router);
  clientService = inject(ClientsService);
  client = signal<IClient | null>(null);
  private fb = inject(FormBuilder);
  clientForm: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    fathersName: [''],
    title: [''],
    ipn: [''],
    account: [''],
    phone: [''],
    address: [''],
  });
  constructor() {
    this.getClient();
  }

  onSubmit() {
    this.clientService
      .update(this.client()!.id, this.clientForm.getRawValue())
      .then(() => this.router.navigateByUrl('/clients'));

    toast.success('Client successfuly updated!');
  }

  setupForm(client: IClient) {
    this.clientForm.patchValue({
      firstName: client.firstName,
      lastName: client.lastName,
      fathersName: client.fathersName,
      title: client.title,
      ipn: client.ipn,
      account: client.account,
      phone: client.phone,
      address: client.address,
    });
  }

  getClient() {
    this.route.paramMap
      .pipe(
        switchMap((params: any) => {
          return this.clientService.getById(parseInt(params.params.id));
        }),
        filter((c) => c !== undefined),
        takeUntilDestroyed(),
      )
      .subscribe((val) => {
        const client = val as IClient;
        this.client.set(client);
        this.setupForm(client);
      });
  }
}
