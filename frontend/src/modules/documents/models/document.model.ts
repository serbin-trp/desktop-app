import { IClient } from '@modules/clients/models/client.model';

export interface IDocument {
  id: string;
  executor: IClient;
  contractor: IClient;
  date: string;
  title: string;
  transactions: string[];
}

export type CreateDocumentDTO = Omit<IDocument, 'id'>;
