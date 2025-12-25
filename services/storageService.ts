
import { openDB, IDBPDatabase } from 'idb';
import { BoilerplateSummary, BoilerplateDetail } from '../types';

const DATABASE_NAME = 'BoilerplateGuruDatabase';
const DATABASE_VERSION = 1;
const SUMMARIES_STORE = 'summaries';
const DETAILS_STORE = 'details';
const METADATA_STORE = 'metadata';

class StorageService {
  private databasePromise: Promise<IDBPDatabase>;

  constructor() {
    this.databasePromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        database.createObjectStore(SUMMARIES_STORE, { keyPath: 'identifier' });
        database.createObjectStore(DETAILS_STORE, { keyPath: 'identifier' });
        database.createObjectStore(METADATA_STORE);
      },
    });
  }

  async getStoredVersion(): Promise<string | null> {
    const database = await this.databasePromise;
    return (await database.get(METADATA_STORE, 'catalog_version')) || null;
  }

  async setStoredVersion(version: string): Promise<void> {
    const database = await this.databasePromise;
    await database.put(METADATA_STORE, version, 'catalog_version');
  }

  async saveSummaries(summaries: BoilerplateSummary[]): Promise<void> {
    const database = await this.databasePromise;
    const transaction = database.transaction(SUMMARIES_STORE, 'readwrite');
    await transaction.store.clear();
    for (const summary of summaries) {
      await transaction.store.put(summary);
    }
    await transaction.done;
  }

  async getSummaries(): Promise<BoilerplateSummary[]> {
    const database = await this.databasePromise;
    return await database.getAll(SUMMARIES_STORE);
  }

  async saveDetail(detail: BoilerplateDetail): Promise<void> {
    const database = await this.databasePromise;
    await database.put(DETAILS_STORE, detail);
  }

  async getDetail(identifier: string): Promise<BoilerplateDetail | null> {
    const database = await this.databasePromise;
    return (await database.get(DETAILS_STORE, identifier)) || null;
  }
}

export const storageService = new StorageService();
