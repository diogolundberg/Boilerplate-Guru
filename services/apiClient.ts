
import { VersionResponse, BoilerplateSummary, BoilerplateDetail } from '../types';

// Replace this with your actual GitHub Raw URL
const GITHUB_BASE = 'https://raw.githubusercontent.com/boilerplate-guru/catalog/main/data';

const DEMO_SUMMARIES: BoilerplateSummary[] = [
  {
    identifier: "react-vite-ts",
    name: "React + Vite + TS",
    language: "TypeScript",
    framework: "React",
    architecture: "SPA",
    description: "Lightning fast React development build with strict TypeScript config.",
    tags: ["vite", "react", "typescript", "fast"]
  },
  {
    identifier: "nextjs-app-router",
    name: "Next.js Enterprise",
    language: "TypeScript",
    framework: "Next.js",
    architecture: "SSR/Server Components",
    description: "Scalable Next.js 14 setup with App Router, Tailwind, and testing baked in.",
    tags: ["nextjs", "ssr", "enterprise"]
  },
  {
    identifier: "node-express-clean",
    name: "Express Clean Arch",
    language: "TypeScript",
    framework: "Express",
    architecture: "Clean Architecture",
    description: "Robust REST API scaffold implementing Uncle Bob's Clean Architecture.",
    tags: ["backend", "express", "clean-architecture"]
  }
];

const DEMO_DETAIL: BoilerplateDetail = {
  ...DEMO_SUMMARIES[0],
  architectureOverview: "src/\n  ├── assets/      # Static assets\n  ├── components/  # Shared UI components\n  ├── features/    # Feature-based modules\n  ├── hooks/       # Custom React hooks\n  ├── services/    # API clients\n  └── utils/       # Helper functions",
  adapterPatterns: [
    {
      title: "API Client Adapter",
      content: "Uses a centralized Axios instance with interceptors for token refreshment."
    }
  ],
  samples: [
    "// vite.config.ts\nexport default defineConfig({\n  plugins: [react()],\n  resolve: { alias: { '@': '/src' } }\n});"
  ]
};

class ApiClient {
  private async request<T>(path: string): Promise<T> {
    try {
      const response = await fetch(`${GITHUB_BASE}${path}`);
      if (!response.ok) {
        throw new Error(`GitHub request failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`Fetch failed for ${path}, using demo data.`);
      if (path.includes('index.json')) return DEMO_SUMMARIES as unknown as T;
      if (path.includes('details')) return DEMO_DETAIL as unknown as T;
      if (path.includes('version')) return { version: '1.0.0' } as unknown as T;
      throw error;
    }
  }

  async getVersion(): Promise<VersionResponse> {
    return this.request<VersionResponse>('/version.json');
  }

  async getBoilerplates(): Promise<BoilerplateSummary[]> {
    return this.request<BoilerplateSummary[]>('/index.json');
  }

  async getBoilerplateDetail(identifier: string): Promise<BoilerplateDetail> {
    return this.request<BoilerplateDetail>(`/details/${identifier}.json`);
  }
}

export const apiClient = new ApiClient();
