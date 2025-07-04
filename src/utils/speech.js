let voice = null;
const audioCache = new Map();

// Base path for static assets depending on deployment location
const BASE_PATH = process.env.PUBLIC_URL || '';

export const initSpeech = async () => {
  return new Promise(resolve => {
    const checkVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) || voices[0];
        resolve();
      } else {
        speechSynthesis.onvoiceschanged = checkVoices;
      }
    };
    checkVoices();
  });
};

export const speakWord = async (text, soundsEnabled) => {
  if (!voice || !soundsEnabled || speechSynthesis.speaking) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  speechSynthesis.speak(utterance);
};

export const preloadAudio = (sounds) => {
  sounds.forEach(sound => {
    const audioUrl = `${BASE_PATH}/audio/${sound}.mp3`;
     console.log(`Preloading audio: ${audioUrl}`); // Debug log
    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audioCache.set(sound, audio);
  });
};

export const playSound = async (sound, soundsEnabled) => {
  if (!soundsEnabled) return;
  try {
    const audioUrl = `${BASE_PATH}/audio/${sound}.mp3`;
    console.log(`Playing audio: ${audioUrl}`); // Debug log
    const audio = audioCache.get(sound) || new Audio(audioUrl);
    await audio.play();
  } catch (e) {
    console.error(`Audio playback error for ${sound}.mp3:`, e);
    const announceEl = document.getElementById('screenReaderAnnounce');
    if (announceEl) {
      announceEl.textContent = 'Audio unavailable. Please try again.';
      setTimeout(() => (announceEl.textContent = ''), 1000);
    }
  }
};

const soundsToPreload = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'long_a', 'long_e', 'long_i', 'long_o', 'long_u'];
preloadAudio(soundsToPreload);

export const parseWord = (word) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const digraphs = ['ch', 'sh', 'th', 'ng'];
  const units = [];
  let i = 0;
  const lower = word.toLowerCase();

  while (i < lower.length) {
    const pair = lower.slice(i, i + 2);
    if (digraphs.includes(pair)) {
      units.push({ text: pair, isVowel: false, isDigraph: true, isLongVowel: false, isSilent: false });
      i += 2;
      continue;
    }

    const char = lower[i];
    const isVowel = vowels.includes(char);
    const isSilent = char === 'e' && i === lower.length - 1 && lower.length > 1;
    let isLongVowel = false;

    if (isVowel && !isSilent && lower.endsWith('e')) {
      const between = lower.slice(i + 1, lower.length - 1);
      if (between && [...between].every(c => !vowels.includes(c))) {
        isLongVowel = true;
      }
    }

    units.push({ text: char, isVowel, isDigraph: false, isLongVowel, isSilent });
    i += 1;
  }

  return units;
};

export const playWordSounds = async (word, soundsEnabled, wordType) => {
  const units = parseWord(word);
  for (const unit of units) {
    if (unit.isSilent) continue;
    const clip = unit.isLongVowel ? `long_${unit.text}` : unit.text;
    // eslint-disable-next-line no-await-in-loop
    await playSound(clip, soundsEnabled);
  }
  await speakWord(word, soundsEnabled);
};
