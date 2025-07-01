import '@testing-library/jest-dom';
jest.mock('i18next', () => ({ language: 'en' }), { virtual: true });

describe('wordGroups fallback', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('provides words for each category when fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('fail'));
    const { loadWordGroups, getWordGroups } = await import('../utils/wordGroups');
    await loadWordGroups();
    const groups = getWordGroups();
    ['ccvc','cvcc','ccvcc','digraphs','extended','silentE'].forEach(cat => {
      expect(groups[cat]).toBeDefined();
      Object.values(groups[cat]).forEach(list => {
        expect(Array.isArray(list) && list.length).toBeTruthy();
      });
    });
  });
});
