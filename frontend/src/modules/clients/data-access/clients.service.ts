import { Injectable, inject } from '@angular/core';
import {
  CreateClientDTO,
  EditClientDTO,
  IClient,
} from '../models/client.model';
import { StorageService } from '@storage';
import { generateId } from '@core/utils/generate-id';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private storage = inject(StorageService);
  private storageKey = 'clients';

  async create(createClientDTO: CreateClientDTO) {
    const clients = await this.storage.instance.read<IClient[]>(
      this.storageKey,
      [],
    );
    const cId = generateId();
    const newClient: IClient = {
      ...createClientDTO,
      id: cId,
      details: {
        clientId: cId,
        title: `${createClientDTO.lastName} ${createClientDTO.firstName} ${createClientDTO.fathersName}`,
        ipn: '',
        phone: '',
        account: '',
        address: '',
      },
    };
    clients.push(newClient);
    await this.storage.instance.write(this.storageKey, clients);
  }

  async update(id: string, payload: EditClientDTO) {
    const clientToUpdate = await this.getById(id);
    if (!clientToUpdate) return;
    clientToUpdate.firstName = payload.firstName;
    clientToUpdate.lastName = payload.lastName;
    clientToUpdate.fathersName = payload.fathersName;
    clientToUpdate.details.address = payload.details.address;
    clientToUpdate.details.phone = payload.details.phone;
    clientToUpdate.details.ipn = payload.details.ipn;
    clientToUpdate.details.account = payload.details.account;
    clientToUpdate.details.title = payload.details.title;
    await this.delete(id);
    const clients = await this.getAll();
    clients.unshift(clientToUpdate);
    await this.storage.instance.write(this.storageKey, clients);
  }

  async delete(id: string) {
    const clients = await this.storage.instance.read<IClient[]>(
      this.storageKey,
      [],
    );
    const foundClient = clients.find((el) => el.id === id);
    if (!foundClient) return;
    const clientsCopy = [...clients];
    const filteredClients = clientsCopy.filter((el) => el.id !== id);
    await this.storage.instance.write(this.storageKey, filteredClients);
  }

  getAll() {
    return this.storage.instance.read<IClient[]>(this.storageKey, []);
  }
  async getById(id: string): Promise<IClient | undefined> {
    const clients = await this.storage.instance.read<IClient[]>(
      this.storageKey,
      [],
    );
    const foundClient = clients.find((el) => el.id === id);
    if (!foundClient) return undefined;
    else return foundClient;
  }
}
