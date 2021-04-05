export const generateRandomSequence = (length: number): number[] => {
  const randomSequence = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    randomSequence.push(randomNumber);
  }
  return randomSequence;
};

export const areArraysEqual = (arr1: number[], arr2: number[]): boolean => {
  if (arr1.length === 0 || arr2.length === 0) return false;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export const animateSequence = (
  sequence: number[],
  delay: number
): Promise<string> => {
  const REANIMATION_GAP = 200; // ms
  for (let i = 0; i < sequence.length; i++) {
    const colorNode = document.querySelector(`.color-${sequence[i]}`);
    setTimeout(() => {
      colorNode?.classList.add(`color-${sequence[i]}-active`);
      new Audio(`${sequence[i]}.mp3`).play();
    }, i * delay);
    setTimeout(() => {
      colorNode?.classList.remove(`color-${sequence[i]}-active`);
    }, (i + 1) * delay - REANIMATION_GAP);
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Make your guess!');
    }, sequence.length * delay);
  });
};

export const animateGuess = (guessIdx: number, delay: number) => {
  const colorNode = document.querySelector(`.color-${guessIdx}`);
  colorNode?.classList.add(`color-${guessIdx}-active`);

  setTimeout(() => {
    colorNode?.classList.remove(`color-${guessIdx}-active`);
  }, delay);
};

export const getLocalStorage = () => {
  let bestScore = localStorage.getItem('best-score');
  return bestScore ? +JSON.parse(bestScore) : 0;
};
