export const fiveRandomIntegerRange = (min, max) => {
  const arr = [];
  while (arr.length < 5) {
    let r = Math.floor(Math.random() * (max - min + 1)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

export const letterB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const letterI = [
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
];
export const letterN = [
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
];
export const letterG = [
  46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
];
export const letterO = [
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
];

export const getFiveRandomNumbers = (array, n) => {
  const shuffled = array.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, n);
};
