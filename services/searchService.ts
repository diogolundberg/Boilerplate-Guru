import Fuse from "fuse.js";
import { BoilerplateSummary } from "../types";

class SearchService {
  private index: Fuse<BoilerplateSummary> | null = null;

  initialize(boilerplates: BoilerplateSummary[]): void {
    const options = {
      keys: [
        { name: "name", weight: 1.0 },
        { name: "language", weight: 0.8 },
        { name: "framework", weight: 0.8 },
        { name: "architecture", weight: 0.6 },
        { name: "description", weight: 0.4 },
        { name: "tags", weight: 0.3 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    };
    this.index = new Fuse(boilerplates, options);
  }

  search(query: string): BoilerplateSummary[] {
    if (!this.index || !query) {
      return [];
    }
    const results = this.index.search(query);
    return results.map((result) => result.item);
  }
}

export const searchService = new SearchService();
