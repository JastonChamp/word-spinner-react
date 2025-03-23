import React, { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { speakWord } from '../utils/speech';
import '../styles/BlendingTimer.css';

const BlendingTimer = () => {
  const { state, setState } = useContext(GameContext);

  useEffect(() => {
    if (state.showBlendingTimer) {
      const timer = setInterval(() => {
        setState(prev => {
          if (!prev.showBlendingTimer || prev.isTimerPaused) return prev;
          const elapsed = (prev.blendingTimeElapsed || 0) + 100;
          if (elapsed >= prev.blendingTime) {
            clearInterval(timer);
            if (prev.soundsEnabled) speakWord(prev.currentWord, prev.soundsEnabled);
            return { ...prev, showBlendingTimer: false, blendingTimeElapsed: 0 };
          }
          return { ...prev, blendingTimeElapsed: elapsed };
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [state.showBlendingTimer, state.isTimerPaused]);

  if (!state.showBlendingTimer) return null;

  const progress = ((state.blendingTime - (state.blendingTimeElapsed || 0)) / state.blendingTime) * 100;

  return (
    <div id="blendingTimerContainer" role="timer" aria-label="Blending timer">
      <p className="timer-label" aria-live="polite">Blend now! ⏳</p>
      <div id="blendingTimer" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <div className="timer-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <button
        onClick={() => setState(prev => ({ ...prev, isTimerPaused: !prev.isTimerPaused }))}
        aria-label={state.isTimerPaused ? 'Resume blending timer' : 'Pause blending timer'}
      >
        {state.isTimerPaused ? '▶️ Resume' : '⏸️ Pause'}
      </button>
      <button
        onClick={() => setState(prev => ({ ...prev, showBlendingTimer: false, isTimerPaused: false, blendingTimeElapsed: 0 }))}
        aria-label="Skip blending timer"
      >
        ⏭️ Skip
      </button>
    </div>
  );
};

export default BlendingTimer;
