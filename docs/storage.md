# Storage Design: The Archive (IndexedDB)

Boilerplate Guru implements an **Offline-First** strategy. This ensures that once the "Guru" has spoken (data is synced), the knowledge remains available even without an internet connection.

## Why IndexedDB?
Unlike `localStorage`, which is synchronous and limited to ~5MB of string data, `IndexedDB` allows for:
-   **Asynchronous operations**: Prevents UI blocking during large data writes.
-   **Structured storage**: Stores objects directly without manual JSON stringification.
-   **Capacity**: Can store significant amounts of data (often hundreds of megabytes).

## Database Schema
The database `BoilerplateGuruDatabase` (Version 1) consists of three primary Object Stores:

### 1. `summaries`
-   **KeyPath**: `identifier`
-   **Purpose**: Stores the high-level list of all available boilerplates.
-   **Usage**: Used by the `SearchPage` to populate the grid and provide data for the fuzzy search index.

### 2. `details`
-   **KeyPath**: `identifier`
-   **Purpose**: Stores the full detailed data for specific boilerplates.
-   **Usage**: Fetched on demand when a user visits a `DetailPage`. This allows for "lazy loading" and caching of heavy detail data (architecture overviews and code samples).

### 3. `metadata`
-   **Purpose**: Stores key-value pairs for app state.
-   **Key**: `catalog_version`
-   **Value**: A version string (e.g., "1.0.4").
-   **Usage**: Used during the "Sync" phase to determine if the local cache is stale compared to the GitHub version.

## Synchronization Logic
1.  **Check Version**: On app load, `catalogService` fetches `version.json` from GitHub.
2.  **Compare**: The app compares the remote version with the version stored in `metadata`.
3.  **Update**: If versions differ, the `summaries` store is cleared and repopulated with fresh data from `index.json`.
4.  **Persistence**: Detailed data is cached locally the first time a user views a specific boilerplate.
