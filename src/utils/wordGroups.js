import i18n from 'i18next'; // Import i18n to access the current language

let wordGroups = {};

export const loadWordGroups = async () => {
  try {
   const response = await fetch(`${process.env.PUBLIC_URL}/wordGroups.json`);
    wordGroups = await response.json();
  } catch (error) {
    console.error('Failed to load word groups:', error);
    // Fallback to a minimal word list if offline and cache fails
    wordGroups = {
      en: {
        cvc: {
          a: ['cat', 'hat', 'bat'],
          e: ['bed', 'red', 'pen'],
          i: ['big', 'dig', 'pin'],
          o: ['dog', 'log', 'top'],
          u: ['bug', 'hug', 'sun']
        }
      },
      es: {
        cvc: {
          a: ['pan', 'sal', 'cal'],
          e: ['pez', 'mes', 'ten'],
          i: ['fin', 'sin', 'mil'],
          o: ['sol', 'col', 'gol'],
          u: ['luz', 'sur', 'pus']
        }
      }
    };
  }
};

export const getWordGroups = () => {
  const language = i18n.language || 'en';
  return wordGroups[language] || wordGroups['en'];
};

loadWordGroups();
