'use client';

import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import StudySession from '../components/StudySession';
import Spinner from '../components/Spinner';
import { StudyDataType } from '../types';
import styles from '../components/components.module.css';
import { Sparkles, ArrowLeft, Info } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studyData, setStudyData] = useState<StudyDataType | null>(null);

  // Use AbortController to prevent stale responses
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const generateStudyGuide = async (topic: string) => {
    // Cancel any in-flight request
    if (abortController) {
      abortController.abort();
    }
    
    const controller = new AbortController();
    setAbortController(controller);
    
    setIsLoading(true);
    setError(null);
    setStudyData(null);

    try {
      const response = await fetch('/api/study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate study guide');
      }

      setStudyData(data as StudyDataType);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted due to new request');
        return;
      }
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (abortController) {
      abortController.abort();
    }
    setStudyData(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Sparkles className="text-gradient" size={32} />
        </div>
        <h1 className={styles.title}>
          <span className="text-gradient">AI</span> Study Assistant
        </h1>
        <p className={styles.subtitle}>
          Turn any topic or notes into interactive flashcards and quizzes instantly.
        </p>
      </header>

      {!studyData && !isLoading && (
        <InputForm 
          onSubmit={generateStudyGuide} 
          isLoading={isLoading} 
          error={error} 
        />
      )}

      {isLoading && (
        <div className={styles.glassPanel}>
          <Spinner message="Analyzing content and generating study materials..." />
        </div>
      )}

      {studyData && !isLoading && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <button className={styles.secondaryButton} onClick={handleReset}>
              <ArrowLeft size={18} /> Back to Input
            </button>
          </div>
          
          {!studyData.isStudyMaterial ? (
            <div className={`${styles.glassPanel} animate-fade-in`} style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <Info size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Not quite study material...</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>
                {studyData.message || "We couldn't generate flashcards or a quiz from your input. Please try pasting class notes or a specific educational topic!"}
              </p>
            </div>
          ) : (
            <StudySession data={studyData} />
          )}
        </>
      )}
    </main>
  );
}
