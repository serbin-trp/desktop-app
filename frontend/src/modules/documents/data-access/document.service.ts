import { Injectable, inject } from '@angular/core';
import { StorageService } from '@storage';
import { CreateDocumentDTO, IDocument } from '../models/document.model';
import { SelectDialog, GeneretePDF } from '@wails/main/App';
import { PdfService } from './pdf.service';
import {
  CreateDocument,
  CreateTransaction,
  DeleteDocument,
  GetDocumentByID,
  GetDocuments,
} from '@wails/api/API';
import { api } from '@wails/models';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private pdfService = inject(PdfService);

  async generatePDF(doc: api.Document): Promise<string | null> {
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
    try {
      const params: api.CreateDocumentParams = {
        date: this.formatDate(document.date as Date),
        title: document.title,
        executorId: document.executor.id,
        contractorId: document.contractor.id,
      };
      const id = await CreateDocument(params);
      const promises = document.transactions.map((t) =>
        CreateTransaction({ documentId: id, amount: t }),
      );

      await Promise.all(promises);
    } catch (e) {
      console.log({ e });
    }
  }

  async getById(id: number) {
    return GetDocumentByID(id);
  }

  async delete(id: number) {
    return DeleteDocument(id);
  }

  async getAll() {
    return GetDocuments();
  }

  formatDate(date: Date): string {
    // Get the day, month, and year from the date object
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth() + 1; // Months are zero-based, so add 1
    let year = date.getFullYear();

    // Pad day and month with leading zeros if necessary
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    // Return the date in DD/MM/YYYY format
    const seperator = '.';
    return day + seperator + month + seperator + year;
  }
}
