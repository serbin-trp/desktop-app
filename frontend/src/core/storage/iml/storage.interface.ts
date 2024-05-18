export interface IStorage {
  read<T>(key: string, defaultValue?: T): Promise<T>;
  write<T>(key: string, value: T): Promise<void>;
  clear(key: string): Promise<void>;
  delete(): Promise<void>;
}
