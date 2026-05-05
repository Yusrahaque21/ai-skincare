import { useState } from 'react';
import { InputForm } from './components/InputForm';
import { Loader } from './components/Loader';
import { RoutineResults } from './components/RoutineResults';
import { generateRoutine } from './services/aiEngine';
import type { RoutineResult, SkinType, SkinConcern } from './services/aiEngine';

function App() {
  const [appState, setAppState] = useState<'input' | 'loading' | 'results'>('input');
  const [results, setResults] = useState<RoutineResult | null>(null);

  const handleGenerate = async (skinType: SkinType, concerns: SkinConcern[]) => {
    setAppState('loading');
    try {
      const routine = await generateRoutine(skinType, concerns);
      setResults(routine);
      setAppState('results');
    } catch (error) {
      console.error("Failed to generate routine", error);
      setAppState('input');
    }
  };

  const handleReset = () => {
    setResults(null);
    setAppState('input');
  };

  return (
    <>
      <div className="bg-glow"></div>
      <div className="bg-glow-2"></div>
      
      <div className="container">
        <header className="animate-slide-up">
          <h1>AI Skincare Routine Generator</h1>
          <p className="subtitle">
            Discover your perfect morning and night skincare routine, personalized by AI to match your unique skin profile and concerns.
          </p>
        </header>

        <main>
          {appState === 'input' && (
            <InputForm onSubmit={handleGenerate} isLoading={false} />
          )}
          
          {appState === 'loading' && (
            <Loader />
          )}
          
          {appState === 'results' && results && (
            <RoutineResults results={results} onReset={handleReset} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
