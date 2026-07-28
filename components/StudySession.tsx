'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { StudyDataType } from '@/types';
import Flashcard from './Flashcard';
import Quiz from './Quiz';
import styles from './components.module.css';

interface StudySessionProps {
  data: StudyDataType;
  onRestart: () => void;
}

export default function StudySession({ data, onRestart }: StudySessionProps) {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz'>('flashcards');

  return (
    <div className={styles.glassPanel}>
      <div className={styles.header} style={{ marginBottom: '2rem' }}>
        <h2 className={styles.title} style={{ fontSize: '2rem' }}>{data.title}</h2>
        <p className={styles.subtitle}>Study Session</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div className={styles.tabs} style={{ margin: 0, flex: 1 }}>
          <div 
            className={styles.tabIndicator} 
            style={{ 
              left: activeTab === 'flashcards' ? '0.5rem' : 'calc(50% + 0.25rem)',
              width: 'calc(50% - 0.75rem)'
            }} 
          />
          <button 
            className={`${styles.tab} ${activeTab === 'flashcards' ? styles.active : ''}`}
            onClick={() => setActiveTab('flashcards')}
          >
            Flashcards ({data.flashcards?.length ?? 0})
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            Practice Quiz ({data.quiz?.length ?? 0})
          </button>
        </div>
        
        <button 
          className={styles.iconButton}
          onClick={onRestart}
          title="Restart Session"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div style={{ animation: 'fadeIn 0.3s ease' }}>
        {activeTab === 'flashcards' ? (
          <Flashcard cards={data.flashcards ?? []} />
        ) : (
          <Quiz questions={data.quiz ?? []} />
        )}
      </div>
    </div>
  );
}
