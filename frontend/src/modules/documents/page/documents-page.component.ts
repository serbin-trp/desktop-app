import { Component, inject } from '@angular/core';
import { toast } from 'ngx-sonner';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@core/ui-kit/ui-button-helm/src';
import { DocumentService } from '../data-access/document.service';
import { CommonModule } from '@angular/common';

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

import { HlmIconComponent } from '@core/ui-kit/ui-icon-helm/src';
import { provideIcons } from '@ng-icons/core';
import {
  lucideTrash,
  lucideMoreVertical,
  lucideUser,
  lucideFile,
  lucidePlus,
  lucideFileSpreadsheet,
} from '@ng-icons/lucide';
import { IDocument } from '../models/document.model';
import { sum } from '@utils/math';

@Component({
  standalone: true,
  selector: 'documents-page',
  templateUrl: './documents-page.component.html',
  styleUrl: './documents-page.component.scss',
  imports: [
    RouterLink,
    HlmButtonDirective,
    CommonModule,

    HlmCaptionComponent,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,

    BrnContextMenuTriggerDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    HlmSubMenuComponent,
    HlmIconComponent,
  ],
  providers: [
    DocumentService,
    provideIcons({
      lucideTrash,
      lucideFileSpreadsheet,

      lucideMoreVertical,
      lucideUser,
      lucideFile,
      lucidePlus,
    }),
  ],
})
export class DocumentsPageComponent {
  private ds = inject(DocumentService);
  documents$ = this.ds.getAll();
  docs: IDocument[] = [];

  loadDocs() {
    this.documents$ = this.ds.getAll().then((docs) => (this.docs = docs));
  }

  handleDelete(id: string) {
    this.ds.delete(id).then(() => this.loadDocs());
    toast.info('Document deleted successfully!');
  }

  trxSum(trx: string[]): string {
    return trx.reduce((v, a) => sum(v, a), '0');
  }
  generate(doc: IDocument) {
    this.ds.generatePDF(doc).then((path) => {
      if (path)
        toast.success('Pdf successfully generated!', {
          description: `Path: ${path}`,
        });
    });
  }
}
