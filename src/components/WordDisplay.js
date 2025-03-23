import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/WordDisplay.css';

const WordDisplay = () => {
  const { state } = useContext(GameContext);

  if (!state.currentWord) return null;

  const units = state.currentWord.split('').map(letter => ({
    text: letter,
    isVowel: /[aeiou]/.test(letter),
  }));

  return (
    <div className="word-display-container">
      <div className="word-display" id="wordBox" aria-live="polite">
        {units.map((unit, i) => (
          <span
            key={i}
            className={`letter ${unit.isVowel ? 'vowel' : ''}`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            {unit.text}
          </span>
        ))}
      </div>
      <div className="color-legend" aria-label="Phonics Color Legend">
        <span className="legend-item vowel">Vowel</span>
        <span className="legend-item digraph">Digraph</span>
        <span className="legend-item long-vowel">Long Vowel</span>
        <span className="legend-item silent">Silent</span>
      </div>
    </div>
  );
};

export default WordDisplay;
