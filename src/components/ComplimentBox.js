import React, { useEffect } from 'react';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/ComplimentBox.css';

const ComplimentBox = () => {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    if (state.compliment) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_COMPLIMENT' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.compliment, dispatch]); // Added dispatch to dependencies

  if (!state.compliment) return null;

  return (
    <div className="compliment-box">
      <p>{state.compliment}</p>
    </div>
  );
};

export default ComplimentBox;
