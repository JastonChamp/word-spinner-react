import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/ActionButtons.css';

const ActionButtons = () => {
 const { state, dispatch } = useContext(GameContext);

 const handleSpin = () => {
 dispatch({ type: 'SPIN_WORD' });
 };

 const handleRepeat = () => {
 dispatch({ type: 'REPEAT_WORD' });
 };

 const handleHint = () => {
 dispatch({ type: 'SHOW_HINT' });
 };

 return (
 <div className="action-buttons">
 <button onClick={handleSpin}>Spin</button>
 <button onClick={handleRepeat}>Repeat</button>
 <button onClick={handleHint}>Hint</button>
 </div>
 );
};

export default ActionButtons;
