import { Injectable } from '@angular/core';
import {
  buildClientTitle,
  CreateClientDTO,
  EditClientDTO,
} from '../models/client.model';
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
    const title = buildClientTitle(createClientDTO);
    const payload = api.CreateClientParams.createFrom({
      ...createClientDTO,
      title,
      type: createClientDTO.type || 'person',
      companyName: createClientDTO.companyName || '',
    });
    await NewClient(payload);
  }

  async update(id: number, payload: EditClientDTO) {
    const data: api.UpdateClientByIDParams =
      api.UpdateClientByIDParams.createFrom({
        id,
        ...payload,
        title: buildClientTitle(payload),
        type: payload.type || 'person',
        companyName: payload.companyName || '',
      });
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
