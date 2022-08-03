export function validateWord(_inputWord: string, _baseWord: string) {
  const inputWord = _inputWord.toLowerCase();
  const baseWord = _baseWord.toLowerCase();
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
export function getWord() {
  //Load words
  const words = ["Pintar", "Obispo", "Copete", "Omitir", "Arruga"];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  return randomWord;
}
