
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
        setError('Failed to load boilerplate details. It might not be available offline.');
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
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-1/3 bg-slate-200 rounded" />
            <div className="h-6 w-2/3 bg-slate-200 rounded" />
            <div className="h-64 bg-slate-200 rounded-xl" />
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
            title="Boilerplate not found" 
            message={error || "We couldn't retrieve the requested information."} 
          />
          <div className="text-center mt-6">
            <Link to="/" className="text-indigo-600 font-medium hover:underline">
              &larr; Back to Search
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
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Catalog
          </Link>

          <div className="border-b border-slate-200 pb-8 mb-10">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {detail.name}
              </h1>
              <div className="flex gap-2">
                <Tag label={detail.language} variant="language" />
                <Tag label={detail.framework} variant="framework" />
                <Tag label={detail.architecture} variant="architecture" />
              </div>
            </div>
            <p className="text-xl text-slate-600 leading-relaxed">
              {detail.description}
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 text-lg">1</span>
              Architecture Overview
            </h2>
            <MonospaceBlock content={detail.architectureOverview} />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 text-lg">2</span>
              Adapter Patterns
            </h2>
            <div className="space-y-8">
              {detail.adapterPatterns.map((pattern, index) => (
                <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{pattern.title}</h3>
                  <div className="text-slate-600 leading-relaxed prose prose-slate">
                    {pattern.content}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 text-lg">3</span>
              Sample Implementations
            </h2>
            <div className="space-y-4">
              {detail.samples.map((sample, index) => (
                <CodeBlock key={index} code={sample} language={detail.language} />
              ))}
            </div>
          </section>
        </div>
      </MainContentRegion>
    </PageContainer>
  );
};
