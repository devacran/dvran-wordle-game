import axios from "axios";

async function WordGameLib() {
  const wordKeySymbol = Symbol.for("words");
  const globalVar: { [wordKeySymbol]: string[] } = global as any;

  try {
    if (!globalVar[wordKeySymbol]) {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
      );
      globalVar[wordKeySymbol] = data.split("\n");
    }
  } catch (error) {
    globalVar[wordKeySymbol] = [
      "Pintar",
      "Obispo",
      "Copete",
      "Omitir",
      "Arruga",
    ];
    console.log(error);
  }

  function getWord(gameLevel?: number) {
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
    if (!globalVar[wordKeySymbol].includes(_inputWord)) {
      throw new Error("Word not found");
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

const wordGameLib = WordGameLib();
export default wordGameLib;
