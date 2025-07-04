import i18n from 'i18next'; // Import i18n to access the current language

let wordGroups = {};

export const loadWordGroups = async () => {
  try {
   const response = await fetch(`${process.env.PUBLIC_URL}/wordGroups.json`);
    wordGroups = await response.json();
  } catch (error) {
    console.error('Failed to load word groups:', error);
    // Fallback to a more complete word list if offline and cache fails
    wordGroups = {
      en: {
        cvc: {
          a: ['cat', 'hat', 'bat'],
          e: ['bed', 'red', 'pen'],
          i: ['big', 'dig', 'pin'],
          o: ['dog', 'log', 'top'],
          u: ['bug', 'hug', 'sun']
        },
        ccvc: {
          a: ['brag', 'clap', 'crab', 'drag', 'flag', 'flap', 'glad', 'grab', 'plan', 'slam', 'snap', 'trap', 'flat', 'swat', 'chat', 'blab', 'clam', 'drab', 'slap', 'stab', 'tram', 'bran'],
          e: ['bled', 'bred', 'fled', 'fret', 'glen', 'pled', 'sled', 'stem', 'step', 'trek', 'prep', 'flex', 'smell', 'blend', 'crest', 'dress', 'press', 'spell', 'swell', 'wreck'],
          i: ['brim', 'clip', 'crib', 'drip', 'flip', 'grin', 'grip', 'skip', 'slim', 'snip', 'spin', 'trip', 'skin', 'swim', 'blip', 'chip', 'slip', 'strip', 'trick'],
          o: ['blot', 'clog', 'crop', 'drop', 'flop', 'frog', 'glob', 'plot', 'prop', 'shop', 'slot', 'stop', 'trot', 'clot', 'spot', 'snot'],
          u: ['club', 'drum', 'grub', 'plug', 'slug', 'snug', 'spun', 'stub', 'stun', 'flub', 'glut', 'plum', 'scum', 'shut', 'flux', 'shun']
        },
        cvcc: {
          a: ['band', 'bank', 'damp', 'hand', 'lamp', 'land', 'pant', 'ramp', 'sand', 'tank', 'gasp'],
          e: ['bend', 'dent', 'felt', 'lend', 'mend', 'nest', 'rest', 'sent', 'tent', 'vest', 'best', 'jest', 'pest', 'test', 'west', 'belt', 'rent', 'went', 'zest', 'left'],
          i: ['film', 'hint', 'lift', 'milk', 'mint', 'pink', 'ring', 'silk', 'sink', 'tilt', 'disk', 'fist', 'list', 'mist', 'wish', 'gilt', 'kilt', 'silt', 'risk'],
          o: ['bond', 'cost', 'fond', 'lost', 'most', 'pond', 'post', 'soft'],
          u: ['bump', 'bunk', 'dust', 'hunt', 'jump', 'just', 'lump', 'must', 'rust', 'dunk', 'fuss', 'gust', 'husk', 'tusk', 'bust', 'musk', 'dusk']
        },
        ccvcc: {
          a: ['brand', 'clamp', 'cramp', 'drank', 'flank', 'frank', 'plank', 'prank', 'stamp', 'stand', 'bland', 'tramp'],
          e: ['blend', 'fleck', 'flesh', 'spend', 'strep', 'swept', 'trend', 'bless', 'crept', 'dress', 'fresh', 'press', 'slept', 'smelt', 'spent', 'twist'],
          i: ['blink', 'clink', 'crisp', 'drink', 'flint', 'print', 'slink', 'stink', 'twist', 'brisk', 'cling', 'fling', 'shift', 'swift', 'drift', 'grill'],
          o: ['blond', 'chomp', 'frost', 'prompt', 'stomp', 'strong', 'throb', 'clonk', 'floss', 'gloss', 'gross', 'prong', 'scoff'],
          u: ['blunt', 'brunt', 'clump', 'crust', 'drunk', 'flung', 'grunt', 'plump', 'stump', 'trunk', 'brush', 'crush', 'flush', 'shrug']
        },
        digraphs: {
          a: ['chat', 'chap', 'than', 'that', 'math', 'bash', 'cash', 'dash', 'lash', 'rash', 'shag', 'sham', 'wham'],
          e: ['shed', 'them', 'then', 'fetch', 'bench', 'check', 'chess', 'fresh', 'retch', 'shell', 'shred', 'theft', 'wrench'],
          i: ['chip', 'chin', 'thin', 'ship', 'shin', 'chick', 'chill', 'shift', 'thick', 'thing', 'wish', 'whip', 'whiz'],
          o: ['shop', 'shot', 'chop', 'shock', 'cloth', 'froth', 'notch', 'shod', 'sloth', 'thong', 'chock', 'throb'],
          u: ['shut', 'thud', 'chug', 'chunk', 'thump', 'brush', 'crush', 'flush', 'shrug', 'blush', 'thumb']
        },
        extended: {
          a: ['fantastic', 'smashing', 'crashing', 'stamping', 'clapping', 'tracking', 'snapping', 'flashing', 'grabbing', 'slashing', 'camping'],
          e: ['wrecking', 'spelling', 'pressing', 'dressing', 'fetching', 'stretching', 'checking', 'swelling', 'shedding', 'tempting'],
          i: ['blinking', 'drinking', 'tripping', 'flipping', 'snipping', 'skipping', 'swinging', 'slipping', 'twisting'],
          o: ['blocking', 'rocking', 'crossing', 'stopping', 'chopping', 'dropping', 'flopping', 'locking', 'shocking', 'trotting'],
          u: ['jumping', 'bumping', 'hunting', 'rushing', 'crushing', 'brushing', 'dumping', 'hugging', 'running', 'tugging']
        },
        silentE: {
          a: ['spade', 'mate', 'game', 'bake', 'gave', 'rake', 'cake', 'lake', 'made', 'name', 'pale', 'sale', 'take', 'wave', 'base', 'case', 'date', 'fate', 'gate', 'hate'],
          e: ['theme', 'these', 'eve', 'cede', 'gene', 'mete', 'scene', 'pete', 'steve'],
          i: ['bike', 'kite', 'lime', 'mine', 'pine', 'time', 'dive', 'five', 'hive', 'bite', 'site'],
          o: ['home', 'nose', 'rope', 'note', 'cone', 'hope', 'robe', 'stone', 'bone', 'dome', 'pole', 'vote'],
          u: ['cube', 'tune', 'mule', 'rude', 'cute', 'dune', 'june', 'lute', 'mute', 'rule', 'tube']
        }
      },
      es: {
        cvc: {
          a: ['pan', 'sal', 'cal'],
          e: ['pez', 'mes', 'ten'],
          i: ['fin', 'sin', 'mil'],
          o: ['sol', 'col', 'gol'],
          u: ['luz', 'sur', 'pus']
        },
        ccvc: {
          a: ['clan', 'flan', 'plan', 'tras', 'cruz', 'bran', 'gran', 'fran', 'dran', 'pran', 'slap', 'snap', 'trap', 'clap', 'glad'],
          e: ['frez', 'trez', 'crez', 'dren', 'tren', 'bret', 'fret', 'gret', 'pret', 'sret', 'stem', 'step', 'bled', 'fled', 'sled'],
          i: ['crin', 'frin', 'prin', 'trin', 'brin', 'slin', 'clin', 'flin', 'glin', 'plin', 'skip', 'slim', 'snip', 'spin', 'trip'],
          o: ['flor', 'clor', 'plor', 'trol', 'drol', 'brot', 'crot', 'frot', 'grot', 'prot', 'shop', 'slot', 'stop', 'trot', 'clot'],
          u: ['club', 'flus', 'plus', 'cruz', 'brus', 'drus', 'grus', 'prus', 'trus', 'slus', 'plug', 'slug', 'snug', 'stub', 'stun']
        },
        cvcc: {
          a: ['banc', 'danc', 'falc', 'manc', 'tanc', 'calc', 'falc', 'salc', 'talc', 'valc', 'past', 'last', 'fast', 'cast', 'raft'],
          e: ['bend', 'dent', 'fent', 'lent', 'ment', 'cent', 'gent', 'nent', 'rent', 'tent', 'best', 'jest', 'pest', 'test', 'west'],
          i: ['film', 'milf', 'silf', 'vilf', 'bilf', 'cilf', 'dilf', 'filf', 'gilf', 'pilf', 'disk', 'fist', 'list', 'mist', 'wish'],
          o: ['bols', 'cols', 'dols', 'fols', 'mols', 'pols', 'rols', 'sols', 'tols', 'vols', 'bolt', 'colt', 'jolt', 'molt', 'roll'],
          u: ['bult', 'cult', 'dult', 'fult', 'mult', 'pult', 'rult', 'sult', 'tult', 'vult', 'dunk', 'cusp', 'fuss', 'gust', 'husk']
        },
        ccvcc: {
          a: ['blanc', 'clanc', 'franc', 'planc', 'tranc', 'branc', 'cranc', 'dranc', 'granc', 'pranc', 'stand', 'plant', 'stamp', 'prank', 'flank'],
          e: ['blend', 'flesk', 'spend', 'trend', 'fresk', 'bresk', 'cresk', 'dresk', 'gresk', 'presk', 'dress', 'fresh', 'press', 'slept', 'smelt'],
          i: ['blink', 'clink', 'drink', 'flint', 'print', 'brisk', 'crisp', 'frisk', 'grisk', 'prisk', 'shift', 'swift', 'twist', 'cling', 'fling'],
          o: ['blond', 'frond', 'grond', 'prond', 'trond', 'brond', 'crond', 'drond', 'flond', 'plond', 'gross', 'prong', 'scoff', 'snort', 'thong'],
          u: ['blunt', 'clump', 'drunk', 'flung', 'grunt', 'brunt', 'crunt', 'frunt', 'prunt', 'trunt', 'brush', 'crush', 'flush', 'shrug', 'slush']
        },
        digraphs: {
          a: ['chan', 'chas', 'char', 'chal', 'cham', 'chap', 'chaz', 'chac', 'chaf', 'chag', 'bash', 'cash', 'dash', 'lash', 'rash'],
          e: ['chez', 'chem', 'chen', 'cher', 'ches', 'chet', 'cheb', 'chec', 'chef', 'cheg', 'shed', 'them', 'then', 'fetch', 'bench'],
          i: ['chin', 'chip', 'chir', 'chis', 'chic', 'chif', 'chig', 'chil', 'chim', 'chiz', 'wish', 'ship', 'shin', 'chick', 'chill'],
          o: ['chon', 'chop', 'chor', 'chos', 'choc', 'chof', 'chog', 'chol', 'chom', 'choz', 'shop', 'shot', 'chop', 'shock', 'cloth'],
          u: ['chuz', 'chum', 'chun', 'chur', 'chus', 'chub', 'chuc', 'chuf', 'chug', 'chul', 'shut', 'thud', 'chug', 'chunk', 'thump']
        },
        extended: {
          a: ['fantastic', 'smashing', 'crashing', 'stamping', 'clapping', 'tracking', 'snapping', 'flashing', 'grabbing', 'slashing'],
          e: ['wrecking', 'spelling', 'pressing', 'dressing', 'fetching', 'stretching', 'checking', 'swelling', 'shedding', 'tempting'],
          i: ['blinking', 'drinking', 'tripping', 'flipping', 'snipping', 'skipping', 'swinging', 'chirping', 'slipping', 'twisting'],
          o: ['blocking', 'rocking', 'crossing', 'stopping', 'chopping', 'dropping', 'flopping', 'locking', 'shocking', 'trotting'],
          u: ['jumping', 'bumping', 'hunting', 'rushing', 'crushing', 'brushing', 'dumping', 'hugging', 'running', 'tugging']
        },
        silentE: {
          a: ['cabe', 'sabe', 'hace', 'pace', 'lace', 'mace', 'nace', 'race'],
          e: ['cede', 'deje', 'leve'],
          i: ['bibe', 'dime', 'lime', 'mime', 'nime', 'pime', 'rime', 'time'],
          o: ['bode', 'code', 'lode', 'mode', 'node', 'pode', 'rode', 'sode'],
          u: ['cune', 'dune', 'fune', 'lune', 'mune', 'nune', 'pune', 'rune']
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
