
import { BoilerplateSummary, BoilerplateDetail } from '../types';

export const DEMO_SUMMARIES: BoilerplateSummary[] = [
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

export const DEMO_DETAIL: BoilerplateDetail = {
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
