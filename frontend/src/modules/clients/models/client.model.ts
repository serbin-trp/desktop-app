import { api } from '@wails/models';

export type IClient = api.Client;
export type ClientType = 'person' | 'company';

export type CreateClientDTO = Omit<
  IClient,
  'id' | 'title' | 'ipn' | 'address' | 'phone' | 'account'
>;
export type EditClientDTO = Omit<IClient, 'id'>;

export function buildClientTitle(client: Partial<IClient>): string {
  if (client.type === 'company') {
    return client.companyName?.trim() ?? '';
  }

  return [client.lastName, client.firstName, client.fathersName]
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function getClientDisplayTitle(client: IClient): string {
  return buildClientTitle(client) || client.title;
}

export function getContractPartyTitle(client: IClient): string {
  const title = getClientDisplayTitle(client);
  return client.type === 'company' ? title : `ФОП "${title}"`;
}
