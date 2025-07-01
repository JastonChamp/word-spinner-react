import React, { createContext, useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getWordGroups, loadWordGroups } from '../utils/wordGroups';
import { speakWord } from '../utils/speech';
export const GameContext = createContext();

export const initialState = {
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
  showTutorial: false,
  showPhonicsIntro: false,
  badges: [],
  showScoreIncrement: false,
  scoreIncrement: 0,
};

export const reducer = (state, action) => {
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
      if (state.currentWord && state.soundsEnabled) {
        speakWord(state.currentWord, state.soundsEnabled);
      }
      return state;
    case 'SHOW_HINT':
      if (state.currentWord && state.soundsEnabled) {
        speakWord(state.currentWord, state.soundsEnabled);
      }
      return state;
    case 'SHOW_PARENTAL_GATE':
      return { ...state, showParentalGate: action.payload };
    case 'UPDATE_DIFFICULTY':
      return { ...state, ...action.payload };
    case 'CORRECT_ANSWER':
      return { ...state, ...action.payload };
    case 'INCORRECT_ANSWER':
      return { ...state, ...action.payload };
      case 'ADD_BADGE':
      if (state.badges.includes(action.payload)) return state;
      return { ...state, badges: [...state.badges, action.payload] };
    case 'SHOW_SCORE_INCREMENT':
      return { ...state, showScoreIncrement: true, scoreIncrement: action.payload };
    case 'HIDE_SCORE_INCREMENT':
      return { ...state, showScoreIncrement: false };
    case 'SET_TOTAL_WORDS':
      return { ...state, totalWords: action.payload };
    case 'UPDATE_THEME':
      return { ...state, theme: action.payload };
    case 'UPDATE_BLENDING_TIME':
      return { ...state, blendingTime: action.payload };
    case 'HIDE_BLENDING_TIMER':
      return { ...state, showBlendingTimer: false };
    case 'TOGGLE_CELEBRATION_MODE':
      return { ...state, celebrationMode: action.payload };
    case 'TOGGLE_ANIMATIONS':
      return { ...state, animationsEnabled: action.payload };
    case 'TOGGLE_FONT_STYLE':
      return { ...state, fontStyle: action.payload };
    case 'TOGGLE_SOUNDS':
      return { ...state, soundsEnabled: action.payload };
    case 'CLEAR_COMPLIMENT':
      return { ...state, compliment: '', showConfetti: false };
    case 'TOGGLE_SETTINGS':
      return { ...state, showSettings: !state.showSettings };
    case 'SET_PREFERENCES':
      return { ...state, ...action.payload };
    case 'SET_MODE':
      return { ...state, mode: action.payload, usedWords: new Set(), revealedWords: 0 };
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { i18n } = useTranslation();

  const savePreferences = () => {
    const prefs = {
      wordType: state.wordType,
      vowelFilter: state.vowelFilter,
      theme: state.theme,
      blendingTime: state.blendingTime,
      celebrationMode: state.celebrationMode,
      animationsEnabled: state.animationsEnabled,
      fontStyle: state.fontStyle,
      soundsEnabled: state.soundsEnabled,
    };
    localStorage.setItem('preferences', JSON.stringify(prefs));
  };

  useEffect(() => {
    const stored = localStorage.getItem('preferences');
    if (stored) {
      dispatch({ type: 'SET_PREFERENCES', payload: JSON.parse(stored) });
    }
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial') === 'true';
    const hasSeenPhonics = localStorage.getItem('hasSeenPhonicsIntro') === 'true';
    dispatch({ type: 'SET_PREFERENCES', payload: { showTutorial: !hasSeenTutorial, showPhonicsIntro: !hasSeenPhonics } });
  }, []);

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
    <GameContext.Provider value={{ state, dispatch, savePreferences }}>
      {children}
    </GameContext.Provider>
  );
};
