import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './components.module.css';

export default function Spinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className={styles.spinnerContainer}>
      <Loader2 size={48} className={styles.spinner} />
      <p style={{ fontWeight: 600 }}>{message}</p>
    </div>
  );
}
