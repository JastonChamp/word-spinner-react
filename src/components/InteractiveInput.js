import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { speakWord } from '../utils/speech';
import '../styles/InteractiveInput.css';

const InteractiveInput = () => {
 const { state, dispatch } = useContext(GameContext); // Changed setState to dispatch
 const [input, setInput] = useState('');
 const [isIncorrect, setIsIncorrect] = useState(false);

 useEffect(() => {
 if (!state.showInteractiveInput) return;

 if (state.successStreak >= 5 && state.difficultyLevel < 2) {
 dispatch({ // Changed setState to dispatch
 type: 'UPDATE_DIFFICULTY',
 payload: {
 difficultyLevel: 2,
 wordType: 'ccvc',
 usedWords: new Set(),
 revealedWords: 0,
 },
 });
 if (state.soundsEnabled) speakWord('Great job! Moving to harder words.', state.soundsEnabled);
 } else if (state.successStreak <= -3 && state.difficultyLevel > 1) {
 dispatch({ // Changed setState to dispatch
 type: 'UPDATE_DIFFICULTY',
 payload: {
 difficultyLevel: 1,
 wordType: 'cvc',
 usedWords: new Set(),
 revealedWords: 0,
 },
 });
 if (state.soundsEnabled) speakWord('Let’s try some easier words.', state.soundsEnabled);
 }
 }, [state.successStreak, state.showInteractiveInput, state.soundsEnabled, state.difficultyLevel, dispatch]); // Changed setState to dispatch in dependencies

 if (!state.showInteractiveInput) return null;

 const handleSubmit = () => {
 if (input.toLowerCase() === state.currentWord) {
 dispatch({ // Changed setState to dispatch
 type: 'CORRECT_ANSWER',
 payload: {
 score: state.score + 10,
 successStreak: state.successStreak + 1,
 revealedWords: state.revealedWords + 1,
 showInteractiveInput: false,
 showConfetti: true,
 compliment: ['Great Job!', 'Awesome!', 'You’re a Star!', 'Well Done!', 'Fantastic!'][Math.floor(Math.random() * 5)],
 },
 });
 if (state.soundsEnabled) speakWord('Great Job!', state.soundsEnabled);
 setInput('');
 setIsIncorrect(false);
 } else {
 dispatch({ // Changed setState to dispatch
 type: 'INCORRECT_ANSWER',
 payload: {
 successStreak: state.successStreak - 1,
 },
 });
 if (state.soundsEnabled) speakWord('Try again!', state.soundsEnabled);
 setInput('');
 setIsIncorrect(true);
 }
 };

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
 <button onClick={handleSubmit}>Submit</ button>
 </div>
 );
};

export default InteractiveInput;
