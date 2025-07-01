import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { GameContext } from '../context/GameContext';
import '../styles/Modal.css';

Modal.setAppElement('#root');

const ParentalGateModal = () => {
const { state, dispatch } = useContext(GameContext);
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (parseInt(answer, 10) === 5) {
      dispatch({ type: 'SHOW_PARENTAL_GATE', payload: false });
      dispatch({ type: 'TOGGLE_SETTINGS' });
    } else {
      alert('Incorrect answer. Please try again.');
    }
    setAnswer('');
  };

  return (
    <Modal
      isOpen={state.showParentalGate}
      onRequestClose={() => dispatch({ type: 'SHOW_PARENTAL_GATE', payload: false })}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Parental Gate</h2>
      <p>Please solve this to access settings: What is 2 + 3?</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        aria-label="Enter answer"
      />
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default ParentalGateModal;
