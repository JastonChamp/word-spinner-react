import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/SettingsPanel.css';

const SettingsPanel = () => {
  const { state, setState, savePreferences } = useContext(GameContext);

  if (!state.showSettings) return null;

  const handleWordTypeChange = (e) => {
    setState(prev => ({
      ...prev,
      wordType: e.target.value,
      usedWords: new Set(),
      revealedWords: 0,
      currentWord: '',
      showInteractiveInput: false,
    }));
    savePreferences();
  };

  const handleVowelChange = (e) => {
    setState(prev => ({
      ...prev,
      vowelFilter: e.target.value,
      usedWords: new Set(),
      revealedWords: 0,
      currentWord: '',
      showInteractiveInput: false,
    }));
    savePreferences();
  };

  return (
    <section id="advancedSettings" className="advanced-settings">
      <h2 className="sr-only">Game Settings</h2>
      <div className="controls-section">
        <div className="select-controls">
          <div>
            <label htmlFor="wordTypeSelector">Word Type:</label>
            <select
              id="wordTypeSelector"
              value={state.wordType}
              onChange={handleWordTypeChange}
            >
              <option value="cvc">CVC Words</option>
              <option value="ccvc">CCVC Words</option>
              <option value="cvcc">CVCC Words</option>
              <option value="ccvcc">CCVCC Words</option>
              <option value="digraphs">Digraphs</option>
              <option value="extended">Extended Words</option>
              <option value="silentE">Silent E Words</option>
            </select>
          </div>
          <div>
            <label htmlFor="vowelSelector">Focus Vowel:</label>
            <select
              id="vowelSelector"
              value={state.vowelFilter}
              onChange={handleVowelChange}
            >
              <option value="all">All Vowels</option>
              <option value="a">A</option>
              <option value="e">E</option>
              <option value="i">I</option>
              <option value="o">O</option>
              <option value="u">U</option>
            </select>
          </div>
          <div>
            <label htmlFor="themeSelector">Theme:</label>
            <select
              id="themeSelector"
              value={state.theme}
              onChange={(e) => {
                setState(prev => ({ ...prev, theme: e.target.value }));
                savePreferences();
              }}
            >
              <option value="default">Default</option>
              <option value="space">Space Adventure</option>
              <option value="forest">Enchanted Forest</option>
              <option value="high-contrast">High Contrast</option>
            </select>
          </div>
        </div>
        <div className="timer-controls">
          <label htmlFor="blendingDelayInput">Blending Time (sec):</label>
          <div className="time-adjust" id="blendingDelayInput">
            <button
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  blendingTime: prev.blendingTime > 1000 ? prev.blendingTime - 500 : prev.blendingTime,
                }));
                savePreferences();
              }}
              aria-label="Decrease blending time by 0.5 seconds"
            >
              ➖
            </button>
            <span id="blendingTimeDisplay">{state.blendingTime / 1000}</span>
            <button
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  blendingTime: prev.blendingTime < 7000 ? prev.blendingTime + 500 : prev.blendingTime,
                }));
                savePreferences();
              }}
              aria-label="Increase blending time by 0.5 seconds"
            >
              ➕
            </button>
          </div>
        </div>
        <div className="settings-section">
          <label>
            <input
              type="checkbox"
              checked={state.celebrationMode}
              onChange={(e) => {
                setState(prev => ({ ...prev, celebrationMode: e.target.checked }));
                savePreferences();
              }}
            />
            Celebration Mode
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.animationsEnabled}
              onChange={(e) => {
                setState(prev => ({ ...prev, animationsEnabled: e.target.checked }));
                savePreferences();
              }}
            />
            Animations On
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.fontStyle === 'dyslexia'}
              onChange={(e) => {
                setState(prev => ({
                  ...prev,
                  fontStyle: e.target.checked ? 'dyslexia' : 'default',
                }));
                savePreferences();
              }}
            />
            Dyslexia-Friendly Font
          </label>
        </div>
        <div className="settings-buttons">
          <button
            onClick={() => {
              setState(prev => ({
                ...prev,
                soundsEnabled: !prev.soundsEnabled,
              }));
              savePreferences();
            }}
          >
            {state.soundsEnabled ? '🔇 Sounds Off' : '🔊 Sounds On'}
          </button>
          <button
            onClick={() => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()}
          >
            ⛶ Fullscreen
          </button>
        </div>
      </div>
    </section>
  );
};

export default SettingsPanel;
