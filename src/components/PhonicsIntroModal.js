import React, { useContext } from 'react';
import Modal from 'react-modal';
import { GameContext } from '../context/GameContext';
import '../styles/Modal.css';

Modal.setAppElement('#root');

const PhonicsIntroModal = () => {
  const { state, setState } = useContext(GameContext);

  const handleClose = () => {
    localStorage.setItem('hasSeenPhonicsIntro', 'true');
    setState(prev => ({ ...prev, showPhonicsIntro: false }));
  };

  return (
    <Modal
      isOpen={state.showPhonicsIntro}
      onRequestClose={handleClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Phonics Basics</h2>
      <p>A <strong>digraph</strong> is two letters that make one sound, like "sh" in "ship".</p>
      <p>A <strong>long vowel</strong> sounds like its name, like "a" in "cake".</p>
      <p>A <strong>silent e</strong> makes the vowel before it long, like in "cake".</p>
      <button onClick={handleClose}>Got it!</button>
    </Modal>
  );
};

export default PhonicsIntroModal;
