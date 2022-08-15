import axios from "axios";

export async function wordsFromApi() {
  const { data } = await axios.get(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
  );
  return data;
}

function WordGameLib(wordsService: () => Promise<string>) {
  const wordKeySymbol = Symbol.for("words");
  const globalVar: { [wordKeySymbol]: string[] } = global as any;

  async function fetchWords() {
    if (!globalVar[wordKeySymbol]) {
      const data = await wordsService();
      globalVar[wordKeySymbol] = data
        .split("\n")
        .map((w: string) => w.toLowerCase());
    }
  }

  async function getWord(gameLevel?: number) {
    await fetchWords();

    const wordsByLevel = gameLevel
      ? globalVar[wordKeySymbol].filter((word) => word.length === gameLevel)
      : globalVar[wordKeySymbol];
    const randomWord =
      wordsByLevel[Math.floor(Math.random() * wordsByLevel.length)];
    return randomWord;
  }

  function validateWord(_inputWord: string, _baseWord: string) {
    const result: number[] = [];
    const inputWord = _inputWord.toLowerCase();
    const baseWord = _baseWord.toLowerCase();

    if (inputWord.length > baseWord.length) {
      throw new Error("Word too large");
    }
    if (inputWord.length < baseWord.length) {
      throw new Error("Word too short");
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

  return {
    getWord,
    validateWord,
  };
}

export default WordGameLib;
