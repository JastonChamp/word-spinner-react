import React, { createContext, useReducer } from 'react';

export const GameContext = createContext();

const initialState = {
  score: 0,
  currentWord: '',
  successStreak: 0,
  revealedWords: 0,
  showInteractiveInput: false,
  showConfetti: false,
  compliment: '',
  difficultyLevel: 1,
  wordType: 'cvc',
  usedWords: new Set(),
  soundsEnabled: true,
  animationsEnabled: true,
  theme: 'light',
  fontStyle: 'default',
  showSettings: false,
  showParentalGate: false,
  showBlendingTimer: false,
  blendingTime: 10,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SPIN_WORD':
      // Logic to select a new word (simplified for now)
      return { ...state, currentWord: 'cat', showInteractiveInput: true };
    case 'REPEAT_WORD':
      // Logic to repeat the current word
      return state;
    case 'SHOW_HINT':
      // Logic to show a hint
      return state;
    case 'SHOW_PARENTAL_GATE':
      return { ...state, showParentalGate: action.payload };
    case 'UPDATE_DIFFICULTY':
      return { ...state, ...action.payload };
    case 'CORRECT_ANSWER':
      return { ...state, ...action.payload };
    case 'INCORRECT_ANSWER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Log the context value for debugging
  console.log('Providing GameContext with:', { state, dispatch });

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
