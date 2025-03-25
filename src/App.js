import React, { useContext, useEffect, useState } from 'react';
import { GameProvider, GameContext } from './context/GameContext';
import Header from './components/Header';
import WordDisplay from './components/WordDisplay';
import ActionButtons from './components/ActionButtons';
import ProgressBar from './components/ProgressBar';
import BlendingTimer from './components/BlendingTimer';
import SettingsPanel from './components/SettingsPanel';
import ParentalGateModal from './components/ParentalGateModal';
import TutorialModal from './components/TutorialModal';
import InteractiveInput from './components/InteractiveInput';
import ComplimentBox from './components/ComplimentBox';
import PhonicsIntroModal from './components/PhonicsIntroModal';
import Confetti from 'react-confetti';
import { initSpeech, playSound } from './utils/speech';
import './styles/App.css';

const AppContent = () => {
  const { state, dispatch } = useContext(GameContext);
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction

  useEffect(() => {
    // Initialize speech synthesis
    initSpeech();

    // Update body attributes for theme and font
    document.body.dataset.theme = state.theme;
    document.body.dataset.font = state.fontStyle;
  }, [state.theme, state.fontStyle]);

  // Play start sound after user interaction
  useEffect(() => {
    if (hasInteracted && state.soundsEnabled) {
      console.log('User has interacted, playing start sound');
      playSound('start', state.soundsEnabled);
    }
  }, [hasInteracted, state.soundsEnabled]);

  // Listen for user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <div className="app-wrapper">
      {state.showConfetti && state.animationsEnabled && (
        <Confetti numberOfPieces={10} recycle={false} run={true} />
      )}
      <Header />
      <main className="container">
        <section className="core-controls" aria-label="Game Controls">
          <div className="score-section">
            <p id="scoreText">
              Score: <span id="scoreValue" aria-live="polite">{state.score}</span>
            </p>
          </div>
          <WordDisplay />
          <ActionButtons />
          <InteractiveInput />
          <ProgressBar />
          <ComplimentBox />
          <BlendingTimer />
          <div id="screenReaderAnnounce" className="sr-only" aria-live="assertive"></div>
        </section>
        <section className="settings-toggle">
          <button
            id="toggleSettingsButton"
            aria-expanded={state.showSettings}
            aria-controls="advancedSettings"
            onClick={() => dispatch({ type: 'SHOW_PARENTAL_GATE', payload: true })}
          >
            ⚙️ {state.showSettings ? 'Hide Settings' : 'Customize'}
          </button>
        </section>
        <SettingsPanel />
      </main>
      <footer>
        <p className="note">Tip: Say the word aloud to blend it!</p>
      </footer>
      <ParentalGateModal />
      <TutorialModal />
      <PhonicsIntroModal />
    </div>
  );
};

const App = () => (
  <GameProvider>
    <AppContent />
  </GameProvider>
);

export default App;
