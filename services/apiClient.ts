
import { VersionResponse, BoilerplateSummary, BoilerplateDetail } from '../types';

const BASE_URL = '/v1';

class ApiClient {
  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) {
      throw new Error(`Api request failed with status: ${response.status}`);
    }
    return response.json();
  }

  async getVersion(): Promise<VersionResponse> {
    return this.request<VersionResponse>('/version');
  }

  async getBoilerplates(): Promise<BoilerplateSummary[]> {
    return this.request<BoilerplateSummary[]>('/boilerplates');
  }

  async getBoilerplateDetail(identifier: string): Promise<BoilerplateDetail> {
    return this.request<BoilerplateDetail>(`/boilerplates/${identifier}`);
  }
}

export const apiClient = new ApiClient();
