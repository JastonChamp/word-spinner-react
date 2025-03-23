import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { speakWord } from '../utils/speech';
import '../styles/InteractiveInput.css';

const InteractiveInput = () => {
  const { state, setState } = useContext(GameContext);
  const [input, setInput] = useState('');
  const [isIncorrect, setIsIncorrect] = useState(false);

  if (!state.showInteractiveInput) return null;

  const handleSubmit = () => {
    if (input.toLowerCase() === state.currentWord) {
      setState(prev => ({
        ...prev,
        score: prev.score + 10,
        successStreak: prev.successStreak + 1,
        revealedWords: prev.revealedWords + 1,
        showInteractiveInput: false,
        showConfetti: true,
        compliment: ['Great Job!', 'Awesome!', 'You’re a Star!', 'Well Done!', 'Fantastic!'][Math.floor(Math.random() * 5)],
      }));
      if (state.soundsEnabled) speakWord('Great Job!', state.soundsEnabled);
      setInput('');
      setIsIncorrect(false);
    } else {
      setState(prev => ({
        ...prev,
        successStreak: prev.successStreak - 1,
      }));
      if (state.soundsEnabled) speakWord('Try again!', state.soundsEnabled);
      setInput('');
      setIsIncorrect(true);
    }
  };

  useEffect(() => {
    if (state.successStreak >= 5 && state.difficultyLevel < 2) {
      setState(prev => ({
        ...prev,
        difficultyLevel: 2,
        wordType: 'ccvc',
        usedWords: new Set(),
        revealedWords: 0,
      }));
      if (state.soundsEnabled) speakWord('Great job! Moving to harder words.', state.soundsEnabled);
    } else if (state.successStreak <= -3 && state.difficultyLevel > 1) {
      setState(prev => ({
        ...prev,
        difficultyLevel: 1,
        wordType: 'cvc',
        usedWords: new Set(),
        revealedWords: 0,
      }));
      if (state.soundsEnabled) speakWord('Let’s try some easier words.', state.soundsEnabled);
    }
  }, [state.successStreak]);

  return (
    <div className="interactive-input">
      <label htmlFor="wordInput">Type the word you heard:</label>
      <input
        type="text"
        id="wordInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Type the word"
        className={isIncorrect ? 'incorrect' : ''}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InteractiveInput;
