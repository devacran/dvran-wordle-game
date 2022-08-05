import { useReducer } from "react";
import { ICharBox } from "./components/CharBox/CharBox.types";
import { IGameWord } from "./components/WordsGrid/WordsGrid.types";
import {
  IGameActions,
  IGameCharState,
  IGameState,
  IGameStateAction as IGameStateActionType,
} from "./Game.types";

const initialWords: IGameWord[] = [];
export const initialGameState: IGameState = {
  baseWord: "",
  score: 0,
  words: initialWords,
  isGameOver: false,
  currentWordIndex: 0,
  currentCharIndex: 0,
  currentWordRef: initialWords[0],
  gameLevel: [4, 4],
};

export const gameStateReducer = (
  state: IGameState,
  action: IGameStateActionType
) => {
  switch (action.type) {
    case "SET_BASE_WORD":
      return {
        ...state,
        baseWord: action.payload,
      };
    case "SET_SCORE":
      return {
        ...state,
        score: action.payload,
      };
    case "SET_WORDS":
      return {
        ...state,
        words: action.payload,
      };
    case "SET_IS_GAME_OVER":
      return {
        ...state,
        isGameOver: action.payload,
      };
    case "SET_CURRENT_WORD_INDEX": {
      return {
        ...state,
        currentWordIndex: action.payload,
      };
    }
    case "SET_CURRENT_CHAR_INDEX": {
      return {
        ...state,
        currentCharIndex: action.payload,
      };
    }
    case "SET_CURRENT_WORD_REF": {
      return {
        ...state,
        currentWordRef: action.payload,
      };
    }
    case "SET_GAME_LEVEL": {
      return {
        ...state,
        gameLevel: action.payload,
      };
    }
    case "SET_SWITCH_TO_NEW_WORD": {
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
        currentCharIndex: 0,
        currentWordRef: state.words[state.currentWordIndex + 1],
      };
    }

    case "SET_WORD_VALIDATION": {
      const newGameWords: IGameWord[] = state.words.map((word, idx) => {
        if (idx === state.currentWordIndex) {
          return {
            ...word,
            value: word.value.map((char, charIdx) => {
              const newChar: ICharBox = {
                ...char,
                state: action.payload[charIdx],
              };
              return newChar;
            }),
          };
        }
        return word;
      });
      return {
        ...state,
        words: newGameWords,
        currentWordRef: newGameWords[state.currentWordIndex],
      };
    }
    case "SET_CHAR_VALUE": {
      const newWords = [...state.words];
      const newWord: IGameWord = {
        ...newWords[state.currentWordIndex],
      };
      newWord.value[action.payload.charIdx].value = action.payload.charValue;
      newWords[state.currentWordIndex] = newWord;
      return {
        ...state,
        words: newWords,
      };
    }
    default:
      return state;
  }
};

export default function useGameState(): {
  state: IGameState;
  action: IGameActions;
} {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);
  const setSwitchToNewWord = () => {
    dispatch({
      type: "SET_SWITCH_TO_NEW_WORD",
      payload: null,
    });
  };
  const setCharValue = (charIdx: number, char: string) => {
    dispatch({
      type: "SET_CHAR_VALUE",
      payload: {
        charIdx,
        charValue: char,
      },
    });
  };
  const setBaseWord = (baseWord: string) => {
    dispatch({
      type: "SET_BASE_WORD",
      payload: baseWord,
    });
  };
  const setScore = (score: number) => {
    dispatch({
      type: "SET_SCORE",
      payload: score,
    });
  };
  const setWords = (words: IGameWord[]) => {
    dispatch({
      type: "SET_WORDS",
      payload: words,
    });
  };
  const setIsGameOver = (gameOver: boolean) => {
    dispatch({
      type: "SET_IS_GAME_OVER",
      payload: gameOver,
    });
  };
  const setCurrentWordIndex = (currentWordIndex: number) => {
    dispatch({
      type: "SET_CURRENT_WORD_INDEX",
      payload: currentWordIndex,
    });
  };
  const setCurrentCharIndex = (currentCharIndex: number) => {
    dispatch({
      type: "SET_CURRENT_CHAR_INDEX",
      payload: currentCharIndex,
    });
  };
  const setCurrentWordRef = (currentWordRef: IGameWord) => {
    dispatch({
      type: "SET_CURRENT_WORD_REF",
      payload: currentWordRef,
    });
  };
  const setGameLevel = (gameLevel: number[]) => {
    dispatch({
      type: "SET_GAME_LEVEL",
      payload: gameLevel,
    });
  };
  const setWordValidation = (wordValidation: IGameCharState[]) => {
    dispatch({
      type: "SET_WORD_VALIDATION",
      payload: wordValidation,
    });
  };

  return {
    state: gameState,
    action: {
      setSwitchToNewWord,
      setCharValue: (charIdx: number, charValue: string) => {
        setCharValue(charIdx, charValue);
      },
      setWordValidation: (wordValidation: IGameCharState[]) => {
        setWordValidation(wordValidation);
      },
      setBaseWord: (baseWord: string) => setBaseWord(baseWord),
      setScore: (score: number) => setScore(score),
      setWords: (words: IGameWord[]) => setWords(words),
      setIsGameOver: (gameOver: boolean) => setIsGameOver(gameOver),
      setCurrentWordIndex: (currentWordIndex: number) =>
        setCurrentWordIndex(currentWordIndex),
      setCurrentCharIndex: (currentCharIndex: number) =>
        setCurrentCharIndex(currentCharIndex),
      setCurrentWordRef: (currentWordRef: IGameWord) =>
        setCurrentWordRef(currentWordRef),
      setGameLevel: (gameLevel: number[]) => setGameLevel(gameLevel),
    },
  };
}
