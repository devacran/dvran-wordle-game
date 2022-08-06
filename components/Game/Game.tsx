import React, {
  createContext,
  FC,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import axios from "axios";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import WordsGrid from "./components/WordsGrid/WordGrid";
import { IGameWord } from "./components/WordsGrid/WordsGrid.types";
import { ICharBox } from "./components/CharBox/CharBox.types";
import {
  IGameCharState,
  IGameState,
  IWordValidationResponse,
} from "./Game.types";
import GameSyles from "./Game.module.css";
import GameStatistics from "./components/GameStatistics";
import useGameState, { gameStateReducer, initialGameState } from "./Game.state";

const gameLevel = [4, 6];
const levelAttempts = gameLevel[0];
const wordLevelLength = gameLevel[1];

const Game: FC = () => {
  const { action: actions, state } = useGameState();
  const {
    baseWord,
    score,
    words,
    currentWordIndex,
    currentCharIndex,
    isGameOver,
    currentWordRef,
  } = state;

  const {
    setBaseWord,
    setScore,
    setWords,
    setWordValidation,
    setCurrentWordIndex,
    setCurrentCharIndex,
    setIsGameOver,
    setCharValue,
    setSwitchToNewWord,
  } = actions;

  const [isOpenWinModal, setIsOpenWinModal] = useState(false);
  const ref = useRef<KeyboardReactInterface | null>(null);

  const finishGame = () => {
    setIsGameOver(true);
  };
  const switchToNextWord = () => {
    setSwitchToNewWord();
  };
  const switchToNextChar = () => {
    setCurrentCharIndex(currentCharIndex + 1);
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
      currentWordRef.value[currentCharIndex - 1] = {
        value: " ",
        state: "idle",
      };
      setCurrentCharIndex(currentCharIndex - 1);
    }
  };

  const openWinModal = () => {
    setIsGameOver(true);
    setIsOpenWinModal(true);
  };
  const submitWord = async (wordToSubmit: string) => {
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
      setWordValidation(wordValidation);

      if (isCorrectWord) {
        setScore(score + 1);
        openWinModal();
      }
      if (currentWordIndex === words.length - 1) {
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

    console.log(currentCharIndex, wordLevelLength);
    if (currentCharIndex < wordLevelLength) {
      setCharValue(currentCharIndex, btnValue);
      switchToNextChar();
    } else {
      if (btnValue === "{enter}") {
        const wordStringToSubmit = currentWordRef.value
          .map((char) => char.value)
          .join("");
        let stringArr = wordStringToSubmit.split("");
        stringArr[currentCharIndex] = btnValue;
        submitWord(wordStringToSubmit);
        return;
      } else {
        console.log("debio entrar aqui");
        return;
      }
    }
  };

  const getBaseWord = async () => {
    try {
      const { data } = await axios.get("api/game/get-word", {
        params: { level: wordLevelLength },
      });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const initGame = async () => {
    const baseWord = await getBaseWord();
    setBaseWord(baseWord);
    const startingWordsFields: IGameWord[] = [];
    for (let i = 0; i < gameLevel[0]; i++) {
      const word: IGameWord = { value: [], baseValue: baseWord };
      for (let j = 0; j < gameLevel[1]; j++) {
        word.value.push({ value: " ", state: "idle" });
      }
      startingWordsFields.push(word);
    }
    setWords(startingWordsFields);
    setWordValidation(
      baseWord
        .replaceAll(/./g, "idle ")
        .split(" ")
        .slice(0, -1) as IGameCharState[]
    );
  };
  console.log(state);
  useEffect(() => {
    initGame();
  }, []);
  return (
    <main className="container">
      <div className={GameSyles.game}>
        <header>
          <h1>Wordle</h1>
        </header>
        <section className="mt-5 mb-5">
          <div>
            <WordsGrid words={words} />
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
      {isOpenWinModal && <GameStatistics data={{ puntuation: score }} />}
    </main>
  );
};

export default Game;
