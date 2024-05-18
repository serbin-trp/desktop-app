import { IClientDetails } from './details.model';

export interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  fathersName: string;
  details: IClientDetails;
}

export type CreateClientDTO = Omit<IClient, 'id' | 'details'>;
export type EditClientDTO = IClient;
