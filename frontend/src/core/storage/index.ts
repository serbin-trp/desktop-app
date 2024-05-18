import { Injectable, inject } from '@angular/core';
import { LocalStorageStorage } from './iml/local-storage.storage';
import { IStorage } from './iml/storage.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorage = inject(LocalStorageStorage);

  public instance: IStorage = this.localStorage;
}
