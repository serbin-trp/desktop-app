import { Injectable } from '@angular/core';
import { CreateClientDTO, EditClientDTO } from '../models/client.model';
import {
  DeleteClient,
  GetAllClients,
  GetClient,
  NewClient,
  UpdateClient,
} from '@wails/api/API';

import { api } from '@wails/models';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  async create(createClientDTO: CreateClientDTO) {
    const title = `${createClientDTO.lastName} ${createClientDTO.firstName} ${createClientDTO.fathersName}`;
    const payload = api.CreateClientParams.createFrom({
      ...createClientDTO,
      title,
    });
    await NewClient(payload);
  }

  async update(id: number, payload: EditClientDTO) {
    const data: api.UpdateClientByIDParams =
      api.UpdateClientByIDParams.createFrom({ id, ...payload });
    await UpdateClient(data);
  }

  async delete(id: number) {
    await DeleteClient(id);
  }

  async getAll(): Promise<api.Client[]> {
    const resp = await GetAllClients();
    return resp;
  }

  async getById(id: number): Promise<api.Client> {
    const resp = await GetClient(id);
    return resp;
  }
}
