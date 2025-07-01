jest.mock('react-i18next', () => ({ useTranslation: () => ({ i18n: { language: 'en' } }) }), { virtual: true });
jest.mock('react-i18next', () => ({ useTranslation: () => ({ i18n: { language: 'en' } }) }), { virtual: true });
jest.mock('../utils/wordGroups', () => ({ getWordGroups: jest.fn(), loadWordGroups: jest.fn() }));
jest.mock('../utils/speech', () => ({ speakWord: jest.fn() }));

import { reducer, initialState } from '../context/GameContext';
import { getWordGroups } from '../utils/wordGroups';
import { speakWord } from '../utils/speech';

import { reducer, initialState } from '../context/GameContext';

describe('GameContext reducer', () => {
  it('toggles settings visibility', () => {
    const state = { ...initialState, showSettings: false };
    const result = reducer(state, { type: 'TOGGLE_SETTINGS' });
    expect(result.showSettings).toBe(true);
  });

  it('sets preferences', () => {
    const state = { ...initialState, theme: 'light' };
    const result = reducer(state, { type: 'SET_PREFERENCES', payload: { theme: 'dark' } });
    expect(result.theme).toBe('dark');
  });
  
  it('adds a badge only once', () => {
    let state = { ...initialState, badges: [] };
    state = reducer(state, { type: 'ADD_BADGE', payload: 'First Word' });
    expect(state.badges).toContain('First Word');
    const again = reducer(state, { type: 'ADD_BADGE', payload: 'First Word' });
    expect(again.badges).toHaveLength(1);
  });

  it('shows and hides score increment', () => {
    const state = reducer(initialState, { type: 'SHOW_SCORE_INCREMENT', payload: 10 });
    expect(state.showScoreIncrement).toBe(true);
    expect(state.scoreIncrement).toBe(10);
    const hidden = reducer(state, { type: 'HIDE_SCORE_INCREMENT' });
    expect(hidden.showScoreIncrement).toBe(false);
  });
  
  it('speaks new word when spinning with sounds enabled', () => {
    getWordGroups.mockReturnValue({
      cvc: { all: ['cat'] },
    });
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const state = { ...initialState, soundsEnabled: true, usedWords: new Set() };
    reducer(state, { type: 'SPIN_WORD' });
    expect(speakWord).toHaveBeenCalledTimes(1);
    expect(speakWord).toHaveBeenCalledWith('cat', true);
    Math.random.mockRestore();
  });
});
