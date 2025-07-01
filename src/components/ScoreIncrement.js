import React, { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/ScoreIncrement.css';

const ScoreIncrement = () => {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    if (state.showScoreIncrement) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_SCORE_INCREMENT' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.showScoreIncrement, dispatch]);

  if (!state.showScoreIncrement) return null;

  return (
    <span className="score-increment">+{state.scoreIncrement}</span>
  );
};

export default ScoreIncrement;
