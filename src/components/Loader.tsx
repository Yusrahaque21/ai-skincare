import React from 'react';
import { Sparkles } from 'lucide-react';

export const Loader: React.FC = () => {
  return (
    <div className="loader-container animate-slide-in">
      <div className="ai-core">
        <Sparkles size={36} />
      </div>
      <div className="loading-text">AI is analyzing your skin profile...</div>
      <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
        Formulating the perfect routine
      </p>
    </div>
  );
};
