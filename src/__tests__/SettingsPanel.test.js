import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPanel from '../components/SettingsPanel';
import { GameContext } from '../context/GameContext';
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k)=>k, i18n: { language: 'en' } }) }), { virtual: true });
jest.mock('i18next', () => ({ language: 'en' }), { virtual: true });

describe('SettingsPanel', () => {
  const baseState = {
    showSettings: true,
    wordType: 'cvc',
    vowelFilter: 'all',
    theme: 'light',
    blendingTime: 10,
    celebrationMode: true,
    animationsEnabled: true,
    fontStyle: 'default',
    soundsEnabled: true,
  };

  it('does not render when showSettings is false', () => {
    render(
      <GameContext.Provider value={{ state: { ...baseState, showSettings: false }, dispatch: jest.fn(), savePreferences: jest.fn() }}>
        <SettingsPanel />
      </GameContext.Provider>
    );
    expect(screen.queryByRole('heading', { name: /game settings/i })).toBeNull();
  });

  it('dispatches action on word type change', () => {
    const dispatch = jest.fn();
    render(
      <GameContext.Provider value={{ state: baseState, dispatch, savePreferences: jest.fn() }}>
        <SettingsPanel />
      </GameContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/word type/i), { target: { value: 'cvcc' } });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_PREFERENCES',
      payload: expect.objectContaining({
        wordType: 'cvcc',
      }),
    });
  });
});
