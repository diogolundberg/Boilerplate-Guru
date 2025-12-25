
import React, { useState, useEffect, useMemo } from 'react';
import { HeaderBar } from '../components/Layout/HeaderBar';
import { PageContainer } from '../components/Layout/PageContainer';
import { MainContentRegion } from '../components/Layout/MainContentRegion';
import { SearchInput } from '../components/Interaction/SearchInput';
import { BoilerplateResultCard } from '../components/Content/BoilerplateResultCard';
import { LoadingIndicator } from '../components/State/LoadingIndicator';
import { EmptyState } from '../components/State/EmptyState';
import { storageService } from '../services/storageService';
import { apiClient } from '../services/apiClient';
import { searchService } from '../services/searchService';
import { BoilerplateSummary, SyncStatus } from '../types';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [boilerplates, setBoilerplates] = useState<BoilerplateSummary[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(SyncStatus.Idle);

  useEffect(() => {
    const initializeData = async () => {
      setSyncStatus(SyncStatus.Syncing);
      try {
        const localVersion = await storageService.getStoredVersion();
        const localData = await storageService.getSummaries();

        let currentVersion = localVersion;
        let currentData = localData;

        try {
          const remoteVersionResponse = await apiClient.getVersion();
          if (!localVersion || remoteVersionResponse.version !== localVersion) {
            const remoteData = await apiClient.getBoilerplates();
            await storageService.saveSummaries(remoteData);
            await storageService.setStoredVersion(remoteVersionResponse.version);
            currentVersion = remoteVersionResponse.version;
            currentData = remoteData;
          }
        } catch (networkError) {
          console.warn('Network sync failed, falling back to local data', networkError);
        }

        setBoilerplates(currentData);
        searchService.initialize(currentData);
        setSyncStatus(SyncStatus.Completed);
      } catch (error) {
        console.error('Initialization error', error);
        setSyncStatus(SyncStatus.Error);
      }
    };

    initializeData();
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return boilerplates;
    }
    return searchService.search(query);
  }, [query, boilerplates]);

  return (
    <PageContainer>
      <HeaderBar />
      <MainContentRegion>
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Find your next <span className="text-indigo-600">scaffold</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8">
            The curated catalog of high-quality software architectures.
          </p>
          <SearchInput value={query} onChange={setQuery} />
        </div>

        {syncStatus === SyncStatus.Syncing && boilerplates.length === 0 ? (
          <LoadingIndicator />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((boilerplate) => (
              <BoilerplateResultCard 
                key={boilerplate.identifier} 
                boilerplate={boilerplate} 
              />
            ))}
          </div>
        )}

        {syncStatus === SyncStatus.Completed && filteredResults.length === 0 && (
          <EmptyState 
            title="No boilerplates found" 
            message={`We couldn't find anything matching "${query}". Try adjusting your search.`}
            icon={
              <svg className="w-16 h-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        )}
      </MainContentRegion>
    </PageContainer>
  );
};
