import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import styles from './components.module.css';

interface InputFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
  error: string | null;
}

export default function InputForm({ onSubmit, isLoading, error }: InputFormProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic);
    }
  };

  return (
    <div className={styles.glassPanel}>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className={`${styles.errorState} animate-fade-in`}>
            <AlertCircle className={styles.errorIcon} />
            <div>
              <strong>Error</strong>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        <textarea
          className={styles.textarea}
          placeholder="Paste your notes, syllabus, or just type a topic (e.g. 'Photosynthesis' or 'World War II')..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isLoading}
          required
        />
        
        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            className={styles.primaryButton}
            disabled={isLoading || !topic.trim()}
          >
            <Sparkles size={18} />
            {isLoading ? 'Generating Magic...' : 'Generate Study Guide'}
          </button>
        </div>
      </form>
    </div>
  );
}
