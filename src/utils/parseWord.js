export const parseWord = word => {
  const DIGRAPHS = ['sh','ch','th','wh','ph','ck','ng'];
  const units = [];
  const lower = word.toLowerCase();
  const silentE = lower.endsWith('e') && word.length > 2;
  const core = silentE ? word.slice(0, -1) : word;
  let i = 0;
  while (i < core.length) {
    const pair = lower.slice(i, i + 2);
    if (DIGRAPHS.includes(pair)) {
      units.push({ text: word.slice(i, i + 2), type: 'digraph' });
      i += 2;
      continue;
    }
    const ch = word[i];
    const type = /[aeiou]/i.test(ch) ? 'vowel' : '';
    units.push({ text: ch, type });
    i += 1;
  }
  if (silentE) {
    units.push({ text: 'e', type: 'silent' });
    const lastIdx = units.length - 2; // index before silent e
    if (lastIdx >= 1) {
      const prevIdx = lastIdx - 1;
      if (units[lastIdx].type !== 'vowel' && /[aeiou]/i.test(units[prevIdx].text)) {
        units[prevIdx].type = 'long-vowel';
      }
    }
  }
  return units;
};

export default parseWord;
