
import { VersionResponse, BoilerplateSummary, BoilerplateDetail } from '../types';
import { DEMO_SUMMARIES, DEMO_DETAIL } from '../data/demo';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/boilerplate-guru/catalog/main/data';

class CatalogService {
  private async fetchJson<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${GITHUB_RAW_BASE}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return response.json();
  }

  async getVersion(): Promise<VersionResponse> {
    try {
      return await this.fetchJson<VersionResponse>('/version.json');
    } catch (error) {
      console.warn('Failed to fetch version, using demo fallback', error);
      return { version: '1.0.0' };
    }
  }

  async getList(): Promise<BoilerplateSummary[]> {
    try {
      return await this.fetchJson<BoilerplateSummary[]>('/index.json');
    } catch (error) {
      console.warn('Failed to fetch catalog index, using demo fallback', error);
      return DEMO_SUMMARIES;
    }
  }

  async getDetail(identifier: string): Promise<BoilerplateDetail> {
    try {
      return await this.fetchJson<BoilerplateDetail>(`/details/${identifier}.json`);
    } catch (error) {
      console.warn(`Failed to fetch detail for ${identifier}, using demo fallback`, error);
      // In a real scenario, we might want to check if the identifier matches the demo
      return DEMO_DETAIL;
    }
  }
}

export const catalogService = new CatalogService();
