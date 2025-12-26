
import React, { useState, useEffect, useMemo } from 'react';
import { HeaderBar } from '../components/Layout/HeaderBar';
import { PageContainer } from '../components/Layout/PageContainer';
import { MainContentRegion } from '../components/Layout/MainContentRegion';
import { SearchInput } from '../components/Interaction/SearchInput';
import { BoilerplateResultCard } from '../components/Content/BoilerplateResultCard';
import { LoadingIndicator } from '../components/State/LoadingIndicator';
import { EmptyState } from '../components/State/EmptyState';
import { storageService } from '../services/storageService';
import { catalogService } from '../services/catalogService';
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
          const remoteVersionResponse = await catalogService.getVersion();
          if (!localVersion || remoteVersionResponse.version !== localVersion) {
            const remoteData = await catalogService.getList();
            await storageService.saveSummaries(remoteData);
            await storageService.setStoredVersion(remoteVersionResponse.version);
            currentData = remoteData;
          }
        } catch (networkError) {
          console.warn('Network sync failed, falling back to local data', networkError);
        }

        // If local storage was empty and network failed (or provided nothing), use what the service returns (demo data)
        if (currentData.length === 0) {
           const fallbackData = await catalogService.getList();
           currentData = fallbackData;
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
          <h1 className="pixel-font text-2xl sm:text-4xl text-[#E6D3B6] mb-6 leading-relaxed">
            FIND YOUR NEXT <span className="text-[#D47833]">SCAFFOLD</span>
          </h1>
          <p className="text-sm font-bold text-[#E6D3B6]/70 mb-10 pixel-font tracking-tighter">
            ARCHITECTURAL BLUEPRINTS FROM THE ARCHIVE
          </p>
          
          <div className="max-w-2xl mx-auto">
            <SearchInput 
              value={query} 
              onChange={setQuery} 
            />
          </div>
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
