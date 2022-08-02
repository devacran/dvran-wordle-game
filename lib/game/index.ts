export function validateWord(inputWord: string, baseWord: string) {
  const result: number[] = [];
  if (inputWord.length > baseWord.length) {
    throw new Error("too large");
  }
  if (inputWord.length < baseWord.length) {
    throw new Error("too short");
  }

  for (let i = 0; i < inputWord.length; i++) {
    const currentChar = inputWord[i];
    if (baseWord.includes(currentChar)) {
      if (baseWord[i] === inputWord[i]) {
        result.push(0);
      } else {
        result.push(1);
      }
    } else {
      result.push(-1);
    }
  }
  return result;
}
