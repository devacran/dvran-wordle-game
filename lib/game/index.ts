import axios from "axios";

async function WordGameLib() {
  let words = ["Pintar", "Obispo", "Copete", "Omitir", "Arruga"];
  try {
    const { data } = await axios.get(
      "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
    );
    words = data.split("\n");
  } catch (error) {
    console.log(error);
  }

  function getWord(gameLevel?: number) {
    console.log("gameLevel", gameLevel);
    const wordsByLevel = gameLevel
      ? words.filter((word) => word.length === gameLevel)
      : words;
    const randomWord =
      wordsByLevel[Math.floor(Math.random() * wordsByLevel.length)];
    return randomWord;
  }

  function validateWord(_inputWord: string, _baseWord: string) {
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

  return {
    getWord,
    validateWord,
  };
}

const wordGameLib = WordGameLib();
export default wordGameLib;
