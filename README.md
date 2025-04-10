# Word Spinner React

![Word Spinner Screenshot](path/to/screenshot.png) <!-- Replace with a screenshot of the app if available -->

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
