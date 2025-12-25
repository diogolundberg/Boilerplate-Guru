
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HeaderBar } from '../components/Layout/HeaderBar';
import { PageContainer } from '../components/Layout/PageContainer';
import { MainContentRegion } from '../components/Layout/MainContentRegion';
import { Tag } from '../components/Interaction/Tag';
import { MonospaceBlock } from '../components/Content/MonospaceBlock';
import { CodeBlock } from '../components/Content/CodeBlock';
import { EmptyState } from '../components/State/EmptyState';
import { apiClient } from '../services/apiClient';
import { storageService } from '../services/storageService';
import { BoilerplateDetail } from '../types';

export const DetailPage: React.FC = () => {
  const { identifier } = useParams<{ identifier: string }>();
  const [detail, setDetail] = useState<BoilerplateDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!identifier) return;
      setLoading(true);
      try {
        const localDetail = await storageService.getDetail(identifier);
        if (localDetail) {
          setDetail(localDetail);
        }

        try {
          const remoteDetail = await apiClient.getBoilerplateDetail(identifier);
          await storageService.saveDetail(remoteDetail);
          setDetail(remoteDetail);
        } catch (networkError) {
          if (!localDetail) {
            throw networkError;
          }
        }
      } catch (fetchError) {
        console.error('Failed to fetch boilerplate details', fetchError);
        setError('OFFLINE OR DATA LOST');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [identifier]);

  if (loading && !detail) {
    return (
      <PageContainer>
        <HeaderBar />
        <MainContentRegion>
          <div className="max-w-4xl mx-auto pixel-font text-center animate-pulse py-20">
            TRANSMITTING DATA...
          </div>
        </MainContentRegion>
      </PageContainer>
    );
  }

  if (error || !detail) {
    return (
      <PageContainer>
        <HeaderBar />
        <MainContentRegion>
          <EmptyState 
            title="MISSING SCROLL" 
            message={error || "NOT FOUND"} 
          />
          <div className="text-center mt-6">
            <Link to="/" className="pixel-button pixel-font text-[10px] text-white">
              RETURN TO TEMPLE
            </Link>
          </div>
        </MainContentRegion>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeaderBar />
      <MainContentRegion>
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="pixel-font text-[10px] text-[#E6D3B6] hover:text-[#D47833] mb-8 inline-block transition-colors">
            <span className="mr-2">&lt;&lt;</span> GO BACK
          </Link>

          <div className="bg-[#E6D3B6] pixel-border p-8 mb-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                <Tag label={detail.language} variant="language" />
                <Tag label={detail.framework} variant="framework" />
                <Tag label={detail.architecture} variant="architecture" />
              </div>
              <h1 className="pixel-font text-2xl sm:text-3xl text-[#2A1A12] leading-tight">
                {detail.name}
              </h1>
              <p className="text-lg text-[#4A3528] font-bold leading-relaxed border-t-4 border-black/10 pt-6">
                {detail.description}
              </p>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="pixel-font text-sm text-[#D47833] mb-6 flex items-center">
              <span className="w-8 h-8 pixel-border bg-[#C44D30] text-white flex items-center justify-center mr-4 text-[12px]">01</span>
              ARCHITECTURE
            </h2>
            <div className="pixel-border bg-white overflow-hidden">
               <MonospaceBlock content={detail.architectureOverview} />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="pixel-font text-sm text-[#D47833] mb-6 flex items-center">
              <span className="w-8 h-8 pixel-border bg-[#C44D30] text-white flex items-center justify-center mr-4 text-[12px]">02</span>
              ADAPTERS
            </h2>
            <div className="grid gap-8">
              {detail.adapterPatterns.map((pattern, index) => (
                <div key={index} className="bg-[#E6D3B6] pixel-border p-6">
                  <h3 className="pixel-font text-[12px] text-[#2A1A12] mb-4 border-b-2 border-black/10 pb-2">{pattern.title}</h3>
                  <div className="text-[#4A3528] font-bold leading-relaxed whitespace-pre-wrap">
                    {pattern.content}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="pixel-font text-sm text-[#D47833] mb-6 flex items-center">
              <span className="w-8 h-8 pixel-border bg-[#C44D30] text-white flex items-center justify-center mr-4 text-[12px]">03</span>
              SAMPLES
            </h2>
            <div className="space-y-8">
              {detail.samples.map((sample, index) => (
                <div key={index} className="pixel-border bg-black">
                   <CodeBlock code={sample} language={detail.language} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </MainContentRegion>
    </PageContainer>
  );
};
