import React, { FC, useEffect, useReducer, useRef, useState } from "react";
import { Layout } from "antd";
import axios, { AxiosError } from "axios";
import "react-simple-keyboard/build/css/index.css";
import WordsGrid from "./components/WordsGrid";
import { IGameWord } from "./components/WordsGrid/WordsGrid.types";
import { IGameCharState, IWordValidationResponse } from "./Game.types";
import styles from "./Game.module.css";
import { useGameState, useGameMutations } from "./Game.state";
import GameKeyboard from "./components/GameKeyboard";

const gameLevel: [number, number] = [2, 5];
const levelAttempts = gameLevel[0];
const wordLevelLength = gameLevel[1];

const Game: FC = () => {
  const state = useGameState();
  const actions = useGameMutations();

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
    setScore,
    setWordValidation,
    setCurrentCharIndex,
    setIsGameOver,
    setCharValue,
    setSwitchToNewWord,
    setInitGame,
  } = actions;

  const [isOpenWinModal, setIsOpenWinModal] = useState(false);
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

  const winGame = () => {
    setScore({ ...score, wins: score.wins + 1 });
    finishGame();
    setIsOpenWinModal(true);
    alert("You win!, your score is: " + String(score.wins + 1));
  };
  const looseGame = () => {
    setScore({ ...score, losses: score.losses + 1 });
    finishGame();
    alert("You loose!");
  };

  const saveGameStateInLocalStorage = () => {
    const gameState = {
      baseWord,
      score,
      words,
      currentWordIndex,
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
        return winGame();
      }

      if (currentWordIndex === words.length - 1) {
        return looseGame();
      } else {
        switchToNextWord();
      }
      setCanSaveInLocalStorage(true);
    } catch (error) {
      const { response } = error as AxiosError<{ error: string }>;
      if (response?.data.error === "Word not found") {
        alert("Palabra no encontrada");
      }
    }
  };

  const handleKeyClick = async (btnValue: string) => {
    const wordIsNotComplete = currentCharIndex < wordLevelLength;
    if (isGameOver) {
      return;
    }

    if (btnValue === "{bksp}") {
      backspace();
      return;
    }

    if (wordIsNotComplete) {
      if (btnValue === "{enter}") {
        return;
      }
      setCharValue(currentCharIndex, btnValue);
      switchToNextChar();
    } else {
      if (btnValue === "{enter}") {
        const wordStringToSubmit = currentWordRef.value
          .map((char) => char.value)
          .join("");
        let stringArr = wordStringToSubmit.split("");
        stringArr[currentCharIndex] = btnValue;
        return submitWord(wordStringToSubmit);
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
    const gameState = localStorage.getItem("game-state");
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
        score: { wins: 0, losses: 0 },
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
    <Layout className={styles["game-page"]}>
      <Layout.Header className={styles["game-header"]}>
        <h1>Wordle</h1>
      </Layout.Header>
      <Layout.Content className={styles["game-content"]}>
        <div>
          <WordsGrid words={words} />
        </div>
        <section className="mt-5 mb-5">
          <div>
            <GameKeyboard handleKeyClick={handleKeyClick} />
          </div>
        </section>
      </Layout.Content>
    </Layout>
  );
};

export default Game;
