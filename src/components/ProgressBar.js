import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/ProgressBar.css';

const ProgressBar = () => {
  const { state } = useContext(GameContext);
  const percent = (state.revealedWords / state.totalWords) * 100 || 0;

  return (
    <div className="progress-container">
      <div className="progress-icon" id="progressIcon" aria-hidden="true">🚀</div>
      <div id="progressBar" role="progressbar" aria-valuenow={Math.round(percent)} aria-valuemin="0" aria-valuemax="100">
        <div id="progressFill" style={{ width: `${percent}%` }}></div>
      </div>
      <p id="progressText" aria-live="polite">{state.revealedWords} / {state.totalWords} Words</p>
    </div>
  );
};

export default ProgressBar;
