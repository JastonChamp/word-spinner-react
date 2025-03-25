import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/BlendingTimer.css';

const BlendingTimer = () => {
  const { state, dispatch } = useContext(GameContext);
  const [timeLeft, setTimeLeft] = useState(state.blendingTime);

  useEffect(() => {
    if (!state.showBlendingTimer) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          dispatch({ type: 'HIDE_BLENDING_TIMER' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.showBlendingTimer, state.blendingTime, dispatch]); // Added dispatch to dependencies

  if (!state.showBlendingTimer) return null;

  return (
    <div className="blending-timer">
      <p>Blend the word in: {timeLeft} seconds</p>
    </div>
  );
};

export default BlendingTimer;
