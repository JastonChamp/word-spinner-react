jest.mock('react-i18next', () => ({ useTranslation: () => ({ i18n: { language: 'en' } }) }), { virtual: true });
jest.mock('../utils/wordGroups', () => ({ getWordGroups: () => ({}), loadWordGroups: jest.fn() }));

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
});
