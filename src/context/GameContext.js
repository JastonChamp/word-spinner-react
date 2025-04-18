import React, { createContext, useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getWordGroups, loadWordGroups } from '../utils/wordGroups';

export const GameContext = createContext();

const initialState = {
  score: 0,
  currentWord: '',
  successStreak: 0,
  revealedWords: 0,
  totalWords: 0,
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
  vowelFilter: 'all',
  celebrationMode: true,
  mode: 'phonics',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SPIN_WORD': {
      const wordGroups = getWordGroups();
      const words = state.vowelFilter === 'all'
        ? Object.values(wordGroups[state.wordType] || {}).flat()
        : wordGroups[state.wordType]?.[state.vowelFilter] || [];
      const availableWords = words.filter(word => !state.usedWords.has(word));
      const newWord = availableWords[Math.floor(Math.random() * availableWords.length)] || words[0];
      const newUsedWords = new Set(state.usedWords);
      newUsedWords.add(newWord);
      return {
        ...state,
        currentWord: newWord,
        showInteractiveInput: true,
        usedWords: newUsedWords,
      };
    }
    case 'REPEAT_WORD':
      return state;
    case 'SHOW_HINT':
      return state;
    case 'SHOW_PARENTAL_GATE':
      return { ...state, showParentalGate: action.payload };
    case 'UPDATE_DIFFICULTY':
      return { ...state, ...action.payload };
    case 'CORRECT_ANSWER':
      return { ...state, ...action.payload };
    case 'INCORRECT_ANSWER':
      return { ...state, ...action.payload };
    case 'SET_TOTAL_WORDS':
      return { ...state, totalWords: action.payload };
    case 'UPDATE_THEME':
      return { ...state, theme: action.payload };
    case 'UPDATE_BLENDING_TIME':
      return { ...state, blendingTime: action.payload };
    case 'TOGGLE_CELEBRATION_MODE':
      return { ...state, celebrationMode: action.payload };
    case 'TOGGLE_ANIMATIONS':
      return { ...state, animationsEnabled: action.payload };
    case 'TOGGLE_FONT_STYLE':
      return { ...state, fontStyle: action.payload };
    case 'TOGGLE_SOUNDS':
      return { ...state, soundsEnabled: action.payload };
    case 'SET_MODE':
      return { ...state, mode: action.payload, usedWords: new Set(), revealedWords: 0 };
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeWords = async () => {
      await loadWordGroups();
      const wordGroups = getWordGroups();
      const words = state.vowelFilter === 'all'
        ? Object.values(wordGroups[state.wordType] || {}).flat()
        : wordGroups[state.wordType]?.[state.vowelFilter] || [];
      dispatch({ type: 'SET_TOTAL_WORDS', payload: words.length });
    };
    initializeWords();
  }, [state.wordType, state.vowelFilter, i18n.language]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
