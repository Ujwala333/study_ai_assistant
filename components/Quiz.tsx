'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import styles from './components.module.css';

interface QuizProps {
  questions: {
    id: string;
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
  }[];
}

export default function Quiz({ questions }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (answers[questionId] !== undefined) return;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctOptionIndex) {
        score++;
      }
    });
    return score;
  };

  const questionsAnsweredCount = Object.keys(answers).length;
  const isStarted = questionsAnsweredCount > 0;
  const currentScore = calculateScore();

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className={styles.quizResults}>
        <div className={styles.scoreCircle} style={{ '--score-pct': `${percentage}%` } as any}>
          <div className={styles.scoreText}>{percentage}%</div>
        </div>
        <h3 className={styles.title} style={{ fontSize: '1.5rem' }}>
          You scored {score} out of {questions.length}
        </h3>
        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>
          {percentage >= 80 ? 'Excellent work! 🎉' : 
           percentage >= 60 ? 'Good job! Keep practicing.' : 
           'Keep reviewing your flashcards, you\'ll get there!'}
        </p>
        <button 
          className={styles.secondaryButton}
          onClick={() => {
            setAnswers({});
            setShowResults(false);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Live score header */}
      <div className={styles.quizHeader}>
        <span style={{ fontWeight: 600, color: '#94a3b8' }}>Practice Questions</span>
        {isStarted && (
          <span className={styles.liveScoreChip}>
            {currentScore} / {questionsAnsweredCount} correct so far
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {questions.map((q, index) => {
          const selectedAnswer = answers[q.id];
          const isAnswered = selectedAnswer !== undefined;
          const isCorrect = selectedAnswer === q.correctOptionIndex;

          return (
            <div key={q.id}>
              <h3 className={styles.quizQuestion}>
                <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>Q{index + 1}.</span> 
                {q.question}
              </h3>
              
              <div className={styles.optionsGrid}>
                {q.options.map((option, optIdx) => {
                  let buttonClass = styles.optionButton;
                  
                  if (isAnswered) {
                    if (optIdx === q.correctOptionIndex) {
                      buttonClass += ` ${styles.correct}`;
                    } else if (optIdx === selectedAnswer) {
                      buttonClass += ` ${styles.incorrect}`;
                    }
                  } else if (selectedAnswer === optIdx) {
                    buttonClass += ` ${styles.selected}`;
                  }

                  return (
                    <button
                      key={optIdx}
                      className={buttonClass}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isAnswered}
                    >
                      <span>{option}</span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isAnswered && optIdx === q.correctOptionIndex && <CheckCircle2 size={20} color="var(--success)" />}
                        {isAnswered && optIdx === selectedAnswer && optIdx !== q.correctOptionIndex && <XCircle size={20} color="var(--error)" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className={`${styles.feedbackBox} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}>
                  <div className={styles.feedbackTitle}>
                    {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </div>
                  <p style={{ marginTop: '0.5rem', lineHeight: 1.5 }}>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {Object.keys(answers).length === questions.length && (
        <div className={styles.buttonGroup} style={{ marginTop: '3rem' }}>
          <button 
            className={styles.primaryButton}
            onClick={() => setShowResults(true)}
          >
            See Final Results
          </button>
        </div>
      )}
    </div>
  );
}
