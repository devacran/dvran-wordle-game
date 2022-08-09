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

const gameLevel: [number, number] = [4, 6];
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
    setInitGame,
  } = actions;

  const [isOpenWinModal, setIsOpenWinModal] = useState(false);
  const ref = useRef<KeyboardReactInterface | null>(null);
  const [canSaveInLocalStorage, setCanSaveInLocalStorage] = useState(false);
  const finishGame = () => {
    setIsGameOver(true);
    const fiveMinutesLater = new Date(new Date().getTime() + 5 * 60 * 1000);
    document.cookie = `game-over=true; expires=${fiveMinutesLater.toUTCString()}`;
    localStorage.removeItem("game-state");
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

  const saveGameStateInLocalStorage = () => {
    const gameState = {
      baseWord,
      score,
      words,
      currentWordIndex: currentWordIndex,
    };
    localStorage.setItem("game-state", JSON.stringify(gameState));
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
      setCanSaveInLocalStorage(true);
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
        return;
      }
    }
  };

  const getBaseWord = async (): Promise<string | undefined> => {
    try {
      const { data } = await axios.get("api/game/get-word", {
        params: { level: wordLevelLength },
      });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const loadGameStateFromStorage = () => {
    const gameState = localStorage.getItem("gameState");
    if (gameState) {
      const parsedGameState = JSON.parse(gameState);
      setInitGame({
        baseWord: parsedGameState.baseWord,
        score: parsedGameState.score,
        words: parsedGameState.words,
        currentWordIndex: parsedGameState.currentWordIndex,
        gameLevel: parsedGameState.gameLevel,
        currentCharIndex: 0,
        isGameOver: false,
      });

      return;
    }
    throw new Error("No game state found");
  };

  const initGame = async () => {
    try {
      loadGameStateFromStorage();
    } catch (error) {
      const baseWord = await getBaseWord();
      if (!baseWord) {
        console.error("error getting base word");
        return;
      }
      const startingWordsFields: IGameWord[] = [];
      for (let i = 0; i < gameLevel[0]; i++) {
        const word: IGameWord = { value: [], baseValue: baseWord };
        for (let j = 0; j < gameLevel[1]; j++) {
          word.value.push({ value: " ", state: "idle" });
        }
        startingWordsFields.push(word);
      }
      setInitGame({
        baseWord,
        score: 0,
        words: startingWordsFields,
        currentWordIndex: 0,
        gameLevel: gameLevel,
        currentCharIndex: 0,
        isGameOver: false,
      });
    }
  };

  useEffect(() => {
    if (canSaveInLocalStorage) {
      saveGameStateInLocalStorage();
      setCanSaveInLocalStorage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSaveInLocalStorage]);

  useEffect(() => {
    const gameOver = document.cookie.includes("game-over");
    if (gameOver) {
      setIsGameOver(true);
    } else {
      initGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container">
      <div className={GameSyles.game}>
        <header>
          <h1>Wordle</h1>
        </header>
        {isGameOver && "GAME OVER Try again later"}
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
