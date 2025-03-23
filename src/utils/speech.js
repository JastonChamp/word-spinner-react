let voice = null;
const audioCache = new Map();

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
    const audio = new Audio(`/audio/${sound}.mp3`);
    audio.preload = 'auto';
    audioCache.set(sound, audio);
  });
};

export const playSound = async (sound, soundsEnabled) => {
  if (!soundsEnabled) return;
  try {
    const audio = audioCache.get(sound) || new Audio(`/audio/${sound}.mp3`);
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

const soundsToPreload = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'long_a', 'long_e', 'long_i', 'long_o', 'long_u', 'start'];
preloadAudio(soundsToPreload);
