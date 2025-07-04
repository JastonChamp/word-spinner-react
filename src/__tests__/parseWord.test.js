import { parseWord } from '../utils/parseWord';

describe('parseWord', () => {
  it('handles digraphs', () => {
    const units = parseWord('chat');
    expect(units).toEqual([
      { text: 'ch', type: 'digraph' },
      { text: 'a', type: 'vowel' },
      { text: 't', type: '' },
    ]);
  });

  it('handles silent e long vowel', () => {
    const units = parseWord('cake');
    expect(units).toEqual([
      { text: 'c', type: '' },
      { text: 'a', type: 'long-vowel' },
      { text: 'k', type: '' },
      { text: 'e', type: 'silent' },
    ]);
  });
});
