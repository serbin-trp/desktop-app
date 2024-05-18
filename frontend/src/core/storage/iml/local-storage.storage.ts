import { Injectable } from '@angular/core';
import { IStorage } from './storage.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageStorage implements IStorage {
  private storageKeyName = 'storage';

  get storage() {
    return JSON.parse(localStorage.getItem(this.storageKeyName) || '{}');
  }
  set storage(value: Record<string, any>) {
    localStorage.setItem(this.storageKeyName, JSON.stringify(value));
  }

  clear(key: string): Promise<void> {
    return new Promise((resolve, _) => {
      const storageCopy = { ...this.storage };
      delete storageCopy[key];
      this.storage = storageCopy;
      resolve();
    });
  }

  read<T>(key: string, defaultValue?: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const foundItem = this.storage[key];
      if (!foundItem && !defaultValue)
        reject(new Error(`Storage doesn't have key: "${key}"`));
      else if (!foundItem && defaultValue) resolve(defaultValue);
      else resolve(foundItem as T);
    });
  }

  write<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve, _) => {
      const storageCopy = { ...this.storage };
      storageCopy[key] = value;
      this.storage = storageCopy;
      resolve();
    });
  }

  delete(): Promise<void> {
    return new Promise((resolve, _) => {
      this.storage = {};
      resolve();
    });
  }
}
