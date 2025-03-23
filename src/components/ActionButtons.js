import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { playSound, speakWord } from '../utils/speech';
import { wordGroups } from '../utils/wordGroups';
import '../styles/ActionButtons.css';

const ActionButtons = () => {
  const { state, setState } = useContext(GameContext);

  const getAvailableWords = () => {
    const group = wordGroups[state.wordType];
    if (state.vowelFilter === 'all') return Object.values(group).flat();
    return group[state.vowelFilter] || [];
  };

  const getRandomWord = () => {
    const words = getAvailableWords().filter(w => !state.usedWords.has(w));
    if (!words.length) {
      setState(prev => ({ ...prev, usedWords: new Set(), revealedWords: 0 }));
      return getRandomWord();
    }
    return words[Math.floor(Math.random() * words.length)];
  };

  const revealWord = async (word, isRepeat = false) => {
    const units = word.split('').map(letter => ({ text: letter }));
    for (const unit of units) {
      await new Promise(resolve => setTimeout(resolve, 400));
      await playSound(unit.text, state.soundsEnabled);
    }

    setState(prev => ({ ...prev, showBlendingTimer: true, blendingTimeElapsed: 0 }));
    if (!isRepeat) {
      setState(prev => ({
        ...prev,
        usedWords: new Set([...prev.usedWords, word]),
        showInteractiveInput: true,
      }));
    }
  };

  const spin = async () => {
    setState(prev => ({
      ...prev,
      spinDisabled: true,
      showInteractiveInput: false,
      currentWord: '',
      showBlendingTimer: false,
    }));
    const newWord = getRandomWord();
    setState(prev => ({
      ...prev,
      currentWord: newWord,
      totalWords: getAvailableWords().length,
    }));
    await revealWord(newWord);
    setState(prev => ({
      ...prev,
      spinDisabled: false,
      hintHidden: false,
      repeatDisabled: false,
    }));
  };

  const repeat = async () => {
    if (!state.currentWord) return;
    setState(prev => ({ ...prev, repeatDisabled: true }));
    await revealWord(state.currentWord, true);
    setState(prev => ({ ...prev, repeatDisabled: false }));
  };

  const hint = async () => {
    if (!state.currentWord) return;
    await playSound(state.currentWord, state.soundsEnabled);
  };

  return (
    <div className="action-buttons kid-mode">
      <button
        onClick={spin}
        disabled={state.spinDisabled}
        aria-label="Spin for a new word"
      >
        <span className="icon" aria-hidden="true">🎡</span> Spin
      </button>
      <button
        onClick={repeat}
        disabled={state.repeatDisabled}
        aria-label="Repeat the word"
      >
        <span className="icon" aria-hidden="true">🔄</span> Repeat
      </button>
      <button
        onClick={hint}
        hidden={state.hintHidden}
        aria-label="Get a hint"
      >
        <span className="icon" aria-hidden="true">💡</span> Hint
      </button>
    </div>
  );
};

export default ActionButtons;
