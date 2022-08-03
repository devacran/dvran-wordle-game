import React, { createContext, FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import WordsGrid from "./components/WordsGrid/WordGrid";
import { IGameWord } from "./components/WordsGrid/WordsGrid.types";
import { ICharBox } from "./components/CharBox/CharBox.types";
import {
  IGameCharState,
  IGameProps,
  IWordValidationResponse,
} from "./Game.types";
import GameSyles from "./Game.module.css";
const defaultGameState = {};
const GameContext = createContext(defaultGameState);
const gameLevel = [2, 6];
const gridY = gameLevel[0];
const gridX = gameLevel[1];
const baseWord = "Miguel";
const Game: FC<IGameProps> = () => {
  const ref = useRef<KeyboardReactInterface | null>(null);
  const [puntuation, setPuntuation] = useState(0);
  const [gameWords, setGameWords] = useState<IGameWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentWordState, setCurrentWordState] = useState<IGameCharState[]>(
    []
  );
  const currentWord = gameWords[currentWordIndex];

  const finishGame = () => {
    setIsGameOver(true);
  };
  const switchToNextWord = () => {
    setCurrentCharIndex(0);
    setCurrentWordIndex((current) => current + 1);
  };
  const switchToNextChar = () => {
    setCurrentCharIndex(currentCharIndex + 1);
  };
  const updateGameWords = (wordValidation: IGameCharState[]) => {
    const newGameWords: IGameWord[] = gameWords.map((word, idx) => {
      if (idx === currentWordIndex) {
        return {
          ...word,
          value: word.value.map((char, charIdx) => {
            const newChar: ICharBox = {
              ...char,
              state: wordValidation[charIdx],
            };
            return newChar;
          }),
        };
      }
      return word;
    });

    setGameWords(newGameWords);
  };
  const mapWordValidationResponse = (data: IWordValidationResponse) => {
    const mapedValidation: IGameCharState[] = data.result.map((r) => {
      if (String(r) === "-1") {
        return "disabled";
      }
      if (String(r) === "0") {
        return "valid";
      }

      return "invalid";
    });
    return mapedValidation;
  };
  const backspace = () => {
    if (currentCharIndex > 0) {
      currentWord.value[currentCharIndex - 1] = {
        value: " ",
        state: "idle",
      };
      setCurrentCharIndex((current) => current - 1);
    }
  };

  const submitWord = async () => {
    const wordToSubmit = currentWord.value.map((char) => char.value).join("");
    try {
      const { data } = await axios.post<IWordValidationResponse>(
        "api/game/validate-word",
        {
          inputWord: wordToSubmit,
          baseWord,
        }
      );
      const wordValidation = mapWordValidationResponse(data);
      const isCorrectWord = wordValidation.every(
        (validation) => validation === "valid"
      );
      setCurrentWordState(wordValidation);
      updateGameWords(wordValidation);
      if (isCorrectWord) {
        setPuntuation((puntuation) => puntuation + 1);
      }
      if (currentWordIndex === gameWords.length - 1) {
        finishGame();
      } else {
        switchToNextWord();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyClick = async (btnValue: string) => {
    if (isGameOver) {
      return;
    }

    if (btnValue === "{bksp}") {
      backspace();
      return;
    }

    if (btnValue === "{enter}") {
      submitWord();
      return;
    }

    currentWord.value[currentCharIndex] = { value: btnValue, state: "idle" };

    if (currentCharIndex === gridX - 1) {
      await submitWord();
    } else {
      switchToNextChar();
    }
  };

  useEffect(() => {});
  useEffect(() => {
    sessionStorage.setItem("baseWord", baseWord);
    const startingWordsFields: IGameWord[] = [];
    for (let i = 0; i < gameLevel[0]; i++) {
      const word: IGameWord = { value: [], baseValue: baseWord };
      word.value.length = gameLevel[1];
      word.value.fill({ value: "", state: "idle" });
      startingWordsFields.push(word);
    }
    setGameWords(startingWordsFields);
    setCurrentWordState(
      baseWord
        .replaceAll(/./g, "idle ")
        .split(" ")
        .slice(0, -1) as IGameCharState[]
    );
  }, []);

  return (
    <GameContext.Provider value={{}}>
      <main className="container">
        <div className={GameSyles.game}>
          <header>
            <h1>Wordle</h1>
          </header>
          <section className="mt-5 mb-5">
            <div>
              <WordsGrid words={gameWords} />
            </div>
          </section>
          <section className="mt-5 mb-5">
            <div>
              <Keyboard
                keyboardRef={(r) => {
                  ref.current = r;
                }}
                onKeyPress={handleKeyClick}
                layout={{
                  default: [
                    "q w e r t y u i o p",
                    "a s d f g h j k l",
                    "{enter} z x c v b n m {bksp}",
                  ],
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </GameContext.Provider>
  );
};

export default Game;
