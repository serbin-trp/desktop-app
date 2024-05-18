import { Injectable, inject } from '@angular/core';
import { StorageService } from '@storage';
import { CreateDocumentDTO, IDocument } from '../models/document.model';
import { generateId } from '@core/utils/generate-id';
import { SelectDialog, GeneretePDF } from '@wails/main/App';
import { PdfService } from './pdf.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private storageKey = 'documents';
  private storage = inject(StorageService);

  private pdfService = inject(PdfService);

  async generatePDF(doc: IDocument): Promise<string | null> {
    try {
      const selectDialogPromise = SelectDialog();
      const replaceHtmlPromise = this.pdfService.replace(doc);
      const result = await Promise.allSettled([
        selectDialogPromise,
        replaceHtmlPromise,
      ]);
      if (result[0].status !== 'fulfilled' || result[1].status !== 'fulfilled')
        return null;
      const path = result[0].value;
      const html = result[1].value;
      await GeneretePDF(path, 'test', html);
      return path;
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async create(document: CreateDocumentDTO) {
    const documents = await this.storage.instance.read<IDocument[]>(
      this.storageKey,
      [],
    );
    const id = generateId();
    const newDocument: IDocument = {
      id,
      ...document,
    };
    documents.unshift(newDocument);
    await this.storage.instance.write(this.storageKey, documents);
  }

  async getById(id: string) {
    const documents = await this.getAll();
    return documents.find((el) => el.id === id);
  }

  async delete(id: string) {
    const documents = await this.getAll();
    const filteredDocs = documents.filter((el) => el.id !== id);
    await this.storage.instance.write(this.storageKey, filteredDocs);
  }

  async getAll() {
    return await this.storage.instance.read<IDocument[]>(this.storageKey, []);
  }
}
