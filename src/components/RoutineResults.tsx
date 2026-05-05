import React from 'react';
import type { RoutineResult } from '../services/aiEngine';
import { Sun, Moon, Beaker, RotateCcw } from 'lucide-react';

interface RoutineResultsProps {
  results: RoutineResult;
  onReset: () => void;
}

export const RoutineResults: React.FC<RoutineResultsProps> = ({ results, onReset }) => {
  return (
    <div className="animate-slide-up">
      <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
        
        {/* Morning Routine */}
        <div className="routine-section">
          <div className="routine-header">
            <Sun className="routine-icon morning" size={28} />
            <h2>Morning Routine</h2>
          </div>
          <div className="routine-steps">
            {results.morning.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-number">{idx + 1}</div>
                <div className="step-content">
                  <h4>{step.product}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Night Routine */}
        <div className="routine-section">
          <div className="routine-header">
            <Moon className="routine-icon night" size={28} />
            <h2>Night Routine</h2>
          </div>
          <div className="routine-steps">
            {results.night.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-number">{idx + 1}</div>
                <div className="step-content">
                  <h4>{step.product}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Ingredients */}
        <div className="routine-section" style={{ marginBottom: 0 }}>
          <div className="routine-header">
            <Beaker className="routine-icon ingredients" size={28} />
            <h2>Recommended Actives</h2>
          </div>
          <div className="ingredients-grid">
            {results.ingredients.map((ingredient, idx) => (
              <div key={idx} className="ingredient-card">
                <Beaker className="ingredient-icon" size={24} />
                <div className="ingredient-name">{ingredient.name}</div>
                <div className="ingredient-desc">{ingredient.description}</div>
              </div>
            ))}
          </div>
        </div>
        
      </div>

      <button onClick={onReset} className="btn-primary" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <RotateCcw size={20} />
        Generate New Routine
      </button>
    </div>
  );
};
