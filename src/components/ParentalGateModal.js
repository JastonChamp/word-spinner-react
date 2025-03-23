import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { GameContext } from '../context/GameContext';
import '../styles/Modal.css';

Modal.setAppElement('#root');

const ParentalGateModal = () => {
  const { state, setState } = useContext(GameContext);
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (parseInt(answer, 10) === 5) {
      setState(prev => ({
        ...prev,
        showParentalGate: false,
        showSettings: !prev.showSettings,
      }));
    } else {
      alert('Incorrect answer. Please try again.');
    }
    setAnswer('');
  };

  return (
    <Modal
      isOpen={state.showParentalGate}
      onRequestClose={() => setState(prev => ({ ...prev, showParentalGate: false }))}
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
