import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/ActionButtons.css';

const ActionButtons = () => {
  const context = useContext(GameContext);

  // context is used for dispatching game actions

  // Fallback if dispatch is undefined
  const dispatch = context?.dispatch || (() => console.error('Dispatch is not available'));

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
