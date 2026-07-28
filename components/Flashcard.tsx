'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import styles from './components.module.css';

interface FlashcardProps {
  cards: {
    id: string;
    front: string;
    back: string;
  }[];
}

export default function Flashcard({ cards }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]); // Re-bind when index changes so it accesses latest state

  // Swipe handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!cards || cards.length === 0) return null;

  return (
    <div>
      <div className={styles.flashcardHeader}>
        <span>Card {currentIndex + 1} of {cards.length}</span>
        <div className={styles.progressDots}>
          {cards.map((_, idx) => (
            <div 
              key={idx} 
              className={`${styles.progressDot} ${idx === currentIndex ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.flashcardWrapper}>
        <button 
          className={styles.navButton} 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous card"
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          className={styles.flashcardContainer} 
          onClick={() => setIsFlipped(!isFlipped)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}>
            {/* Front of card */}
            <div className={styles.flashcardFront}>
              <div className={styles.flashcardContent}>
                {currentCard.front}
              </div>
              <div className={styles.flashcardHint}>
                <RotateCcw size={16} /> Click or press Space to flip
              </div>
            </div>

            {/* Back of card */}
            <div className={styles.flashcardBack}>
              <div className={styles.flashcardContent}>
                {currentCard.back}
              </div>
              <div className={styles.flashcardHint}>
                <CheckCircle2 size={16} color="var(--success)" /> Answer
              </div>
            </div>
          </div>
        </div>

        <button 
          className={styles.navButton} 
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          aria-label="Next card"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
