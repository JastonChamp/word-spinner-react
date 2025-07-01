# Word Spinner React


**Word Spinner** is a React-based phonics learning web app designed for young children to practice blending and reading skills. It features a playful interface, adaptive difficulty, accessibility options, and alignment with educational standards like the Singapore MOE phonics curriculum.

## Live Demo

Try the app live at [https://JastonChamp.github.io/word-spinner-react/](https://JastonChamp.github.io/word-spinner-react/)!

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Word Lists](#word-lists)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Interactive Phonics Practice:** Spin to reveal words, listen to phoneme sounds, blend them aloud, and type the word.
- **Adaptive Difficulty:** Adjusts word complexity based on the child's performance (e.g., from CVC to CCVC words).
- **Accessibility:** Includes dyslexia-friendly font options, high-contrast themes, animation toggles, and ARIA support.
- **Parental Controls:** Settings are protected by a simple math-based parental gate.
- **Educational Alignment:** Word lists are aligned with the Singapore MOE phonics curriculum.
- **Engaging Design:** Playful animations, confetti celebrations, and immediate feedback to motivate young learners.
- **Tutorial and Phonics Intro:** Interactive tutorial for first-time users and a phonics basics introduction.
- **Real Audio Files:** Includes real `.mp3` audio files for phoneme sounds, long vowels, and start sounds to enhance the learning experience.
- **Offline Functionality:** Works offline using a Service Worker to cache assets like word lists and audio files.
- **Multi-Language Support:** Supports English and Spanish word lists with UI translations.

## Word Lists
The app includes a variety of word lists for phonics practice, available in both English and Spanish. Below are some examples from `wordGroups.json`:

### English Word Lists
- **CVC Words**:
  - **A**: bat, cat, dad, fan, hat
  - **E**: bed, den, fed, get, hen
  - **I**: big, dig, fin, hit, jig
  - **O**: box, cot, dog, fog, hop
  - **U**: bug, cup, cut, fun, gum
- **CCVC Words**:
  - **A**: brag, clap, crab, drag, flag
  - **E**: bled, bred, fled, fret, glen
- **Silent E Words**:
  - **A**: spade, mate, game
  - **I**: bike, kite, lime

### Spanish Word Lists
- **CVC Words**:
  - **A**: pan, sal, cal, mal, tal
  - **E**: pez, mes, ten, ven, cen
  - **I**: fin, sin, mil, vil, gil
  - **O**: sol, col, gol, mol, tol
  - **U**: luz, sur, pus, mus, tus
- **CCVC Words**:
  - **A**: clan, flan, plan, tras, cruz
  - **E**: frez, trez, crez, dren, tren
- **Silent E Words**:
  - **A**: cabe, sabe, hace
  - **I**: bibe, dime, lime

For a full list of words, see the `public/wordGroups.json` file.

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [Yarn](https://yarnpkg.com/)
- Git (for cloning the repository)

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/JastonChamp/word-spinner-react.git
   cd word-spinner-react
 npm install
   npm start
   ```
2. **Run Tests:**
   ```bash
   npm test
   ```
3. **Build for Production:**
   ```bash
   npm run build
   ```
   This creates an optimized `build` folder for deployment to static hosting services like GitHub Pages.

## Usage
After starting the development server, open `http://localhost:3000` in your browser. Spin the wheels, blend the sounds, and type the resulting word. Use the settings panel (gear icon) to switch word lists, change languages, or toggle accessibility options like a dyslexia-friendly font.

## Project Structure
```
public/
  index.html
  wordGroups.json
src/
  components/
  context/
  styles/
  utils/
  i18n.js
  index.js
  App.js
```
- **components/** houses React components such as `WordDisplay`, `SettingsPanel`, and various modals.
- **context/** contains shared state logic through `GameContext`.
- **utils/** provides helper functions like audio playback.
- **__tests__/** includes unit tests for components and context logic.

## Technologies Used
- React 18 and React Scripts
- React Modal and React Confetti
- Testing Library (React & Jest)
- Service Worker for offline support
- Node.js and npm

## Troubleshooting
- If `npm start` fails, remove `node_modules` and run `npm install` again.
- Ensure your browser allows audio playback; some browsers block autoplay by default.
- For issues loading word lists or audio files, check the developer console for network errors.

## Contributing
Contributions are welcome! Open an issue to discuss improvements or features. This project builds on the earlier **CVCwords** repo, so pull requests that enhance accessibility and phonics accuracy are appreciated.

## License
Licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for full details.
