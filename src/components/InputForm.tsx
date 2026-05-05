import React, { useState } from 'react';
import type { SkinType, SkinConcern } from '../services/aiEngine';
import { Sparkles, ArrowRight } from 'lucide-react';

interface InputFormProps {
  onSubmit: (skinType: SkinType, concerns: SkinConcern[]) => void;
  isLoading: boolean;
}

const AVAILABLE_CONCERNS: SkinConcern[] = [
  'Acne', 'Dark Spots', 'Wrinkles', 'Redness', 'Dullness', 'Large Pores'
];

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [skinType, setSkinType] = useState<SkinType>('Combination');
  const [selectedConcerns, setSelectedConcerns] = useState<SkinConcern[]>([]);

  const toggleConcern = (concern: SkinConcern) => {
    setSelectedConcerns(prev => 
      prev.includes(concern) 
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(skinType, selectedConcerns);
  };

  return (
    <form className="glass animate-slide-up" style={{ padding: '2rem' }} onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="skin-type">What is your primary skin type?</label>
        <select 
          id="skin-type" 
          className="select-input"
          value={skinType}
          onChange={(e) => setSkinType(e.target.value as SkinType)}
        >
          <option value="Oily">Oily (Shiny, prone to breakouts)</option>
          <option value="Dry">Dry (Flaky, tight feeling)</option>
          <option value="Combination">Combination (Oily T-zone, dry cheeks)</option>
          <option value="Normal">Normal (Well-balanced)</option>
          <option value="Sensitive">Sensitive (Easily irritated, prone to redness)</option>
        </select>
      </div>

      <div className="form-group" style={{ marginBottom: '2rem' }}>
        <label className="form-label">What are your main skin concerns? (Select all that apply)</label>
        <div className="tags-container">
          {AVAILABLE_CONCERNS.map(concern => (
            <div key={concern}>
              <input 
                type="checkbox" 
                id={`concern-${concern}`}
                className="tag-checkbox"
                checked={selectedConcerns.includes(concern)}
                onChange={() => toggleConcern(concern)}
              />
              <label htmlFor={`concern-${concern}`} className="tag-label">
                {concern}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button 
        type="submit" 
        className="btn-primary" 
        disabled={isLoading || selectedConcerns.length === 0}
      >
        {isLoading ? (
          <>
            <Sparkles className="animate-spin" size={20} />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generate Routine
            <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </>
        )}
      </button>
      
      {selectedConcerns.length === 0 && (
        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'center' }}>
          Please select at least one skin concern.
        </p>
      )}
    </form>
  );
};
