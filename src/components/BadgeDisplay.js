import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/BadgeDisplay.css';

const BadgeDisplay = () => {
  const { state } = useContext(GameContext);

  if (!state.badges || state.badges.length === 0) return null;

  return (
    <div className="badge-display" aria-label="Earned Badges">
      {state.badges.map((badge) => (
        <span key={badge} className="badge">
          {badge}
        </span>
      ))}
    </div>
  );
};

export default BadgeDisplay;
