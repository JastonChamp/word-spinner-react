import React, { createContext, useState, useEffect } from 'react';
import { initSpeech } from '../utils/speech';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, setState] = useState({
    score: 0,
    revealedWords: 0,
    totalWords: 0,
    usedWords: new Set(),
    currentWord: '',
    blendingTime: 3000,
    soundsEnabled: true,
    wordType: 'cvc',
    vowelFilter: 'all',
    theme: 'default',
    celebrationMode: false,
    animationsEnabled: true,
    fontStyle: 'default',
    successStreak: 0,
    difficultyLevel: 1,
    isTimerPaused: false,
    showBlendingTimer: false,
    blendingTimeElapsed: 0,
    showParentalGate: false,
    showSettings: false,
    showTutorial: !localStorage.getItem('hasSeenTutorial'),
    showPhonicsIntro: !localStorage.getItem('hasSeenPhonicsIntro'),
    showInteractiveInput: false,
    showConfetti: false,
    compliment: '',
  });

  useEffect(() => {
    const savedPrefs = JSON.parse(localStorage.getItem('wordSpinnerPrefs')) || {};
    setState(prev => ({
      ...prev,
      ...savedPrefs,
      usedWords: new Set(savedPrefs.usedWords || []),
      showTutorial: !localStorage.getItem('hasSeenTutorial'),
      showPhonicsIntro: !localStorage.getItem('hasSeenPhonicsIntro'),
    }));
  }, []);

  useEffect(() => {
    initSpeech();
  }, []);

  const savePreferences = () => {
    localStorage.setItem('wordSpinnerPrefs', JSON.stringify({
      ...state,
      usedWords: Array.from(state.usedWords),
    }));
  };

  return (
    <GameContext.Provider value={{ state, setState, savePreferences }}>
      {children}
    </GameContext.Provider>
  );
};
