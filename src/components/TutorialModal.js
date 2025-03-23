import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { GameContext } from '../context/GameContext';
import { playSound } from '../utils/speech';
import '../styles/Modal.css';

Modal.setAppElement('#root');

const TutorialModal = () => {
  const { state, setState } = useContext(GameContext);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleStart = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setState(prev => ({ ...prev, showTutorial: false }));
    if (state.soundsEnabled) playSound('start', state.soundsEnabled);
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setState(prev => ({ ...prev, showTutorial: false }));
  };

  return (
    <Modal
      isOpen={state.showTutorial}
      onRequestClose={handleSkip}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Welcome to Word Spinner!</h2>
      {step === 1 && (
        <div>
          <p>Step 1: Click "Spin" to get a new word.</p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p>Step 2: Listen to the sounds and blend them aloud.</p>
          <p>Use the timer to pace yourself, or pause/skip if needed.</p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <p>Step 3: Type the word you heard, or use "Repeat" and "Hint" for help.</p>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleSkip}>Skip</button>
        </div>
      )}
    </Modal>
  );
};

export default TutorialModal;
