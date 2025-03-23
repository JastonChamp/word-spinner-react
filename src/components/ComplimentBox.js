import React, { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/ComplimentBox.css';

const ComplimentBox = () => {
  const { state, setState } = useContext(GameContext);

  useEffect(() => {
    if (state.compliment) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, compliment: '' }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.compliment]);

  if (!state.compliment) return null;

  return (
    <div id="complimentBox" className="compliment-box show" aria-live="assertive">
      {state.compliment}
    </div>
  );
};

export default ComplimentBox;
