import { IClient } from '@modules/clients/models/client.model';

export interface IDocument {
  id: string;
  executor: IClient;
  contractor: IClient;
  date: string;
  title: string;
  transactions: DocumentTransactionDTO[];
}

export interface CreateDocumentDTO {
  executor: IClient;
  contractor: IClient;
  date: string | Date;
  title: string;
  transactions: DocumentTransactionDTO[];
}

export interface DocumentTransactionDTO {
  title: string;
  amount: string;
}
