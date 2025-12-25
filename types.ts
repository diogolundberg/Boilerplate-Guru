
export interface VersionResponse {
  version: string;
}

export interface BoilerplateSummary {
  identifier: string;
  name: string;
  language: string;
  framework: string;
  architecture: string;
  description: string;
  tags: string[];
}

export interface AdapterPattern {
  title: string;
  content: string;
}

export interface BoilerplateDetail extends BoilerplateSummary {
  architectureOverview: string;
  adapterPatterns: AdapterPattern[];
  samples: string[];
}

export enum SyncStatus {
  Idle = 'Idle',
  Syncing = 'Syncing',
  Completed = 'Completed',
  Error = 'Error'
}
