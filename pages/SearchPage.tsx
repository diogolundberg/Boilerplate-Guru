
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

        let currentData = localData;

        try {
          const remoteVersionResponse = await apiClient.getVersion();
          if (!localVersion || remoteVersionResponse.version !== localVersion) {
            const remoteData = await apiClient.getBoilerplates();
            await storageService.saveSummaries(remoteData);
            await storageService.setStoredVersion(remoteVersionResponse.version);
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
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="mb-8 flex justify-center">
             <div className="w-24 h-24 bg-[#E6D3B6] pixel-border p-2">
                <div className="w-full h-full bg-[#D47833] pixel-border relative">
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#C44D30] pixel-border"></div>
                   <div className="absolute bottom-4 left-2 right-2 h-4 bg-white/20"></div>
                </div>
             </div>
          </div>
          <h1 className="pixel-font text-2xl sm:text-4xl text-[#E6D3B6] mb-6 leading-relaxed">
            FIND YOUR NEXT <span className="text-[#D47833]">SCAFFOLD</span>
          </h1>
          <p className="text-sm font-bold text-[#E6D3B6]/70 mb-10 pixel-font tracking-tighter">
            THE ANCIENT WISDOM OF REUSABLE CODE
          </p>
          <SearchInput value={query} onChange={setQuery} />
        </div>

        {syncStatus === SyncStatus.Syncing && boilerplates.length === 0 ? (
          <LoadingIndicator />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            title="THE VOID ECHOES" 
            message={`NOTHING FOUND MATCHING "${query.toUpperCase()}"`}
            icon={
              <div className="w-16 h-16 bg-[#2A1A12] pixel-border mx-auto flex items-center justify-center text-[#C44D30] pixel-font">?</div>
            }
          />
        )}
      </MainContentRegion>
    </PageContainer>
  );
};
