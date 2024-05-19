import { api } from '@wails/models';

export type IClient = api.Client;

export type CreateClientDTO = Omit<
  IClient,
  'id' | 'title' | 'ipn' | 'address' | 'phone' | 'account'
>;
export type EditClientDTO = Omit<IClient, 'id'>;
