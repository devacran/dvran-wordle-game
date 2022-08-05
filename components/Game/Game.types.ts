import { IGameWord } from "./components/WordsGrid/WordsGrid.types";

export type IGameCharState = "idle" | "valid" | "invalid" | "disabled";
export type IWordValidationResponse = {
  result: ("-1" | "0" | "1")[];
};
export type IGameState = {
  baseWord: string;
  currentCharIndex: number;
  currentWordRef: IGameWord;
  currentWordIndex: number;
  gameLevel: [number, number];
  isGameOver: boolean;
  score: number;
  words: IGameWord[];
};
export type IGameStateAction = {
  type:
    | "SET_SWITCH_TO_NEW_WORD"
    | "SET_CHAR_VALUE"
    | "SET_WORD_VALIDATION"
    | "SET_BASE_WORD"
    | "SET_SCORE"
    | "SET_WORDS"
    | "SET_IS_GAME_OVER"
    | "SET_CURRENT_WORD_INDEX"
    | "SET_CURRENT_CHAR_INDEX"
    | "SET_CURRENT_WORD_REF"
    | "SET_GAME_LEVEL";
  payload: any;
};

export type IGameActions = {
  setBaseWord: (baseWord: string) => void;
  setScore: (score: number) => void;
  setWords: (words: IGameWord[]) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  setCurrentWordIndex: (currentWordIndex: number) => void;
  setCurrentCharIndex: (currentCharIndex: number) => void;
  setCurrentWordRef: (currentWordRef: IGameWord) => void;
  setGameLevel: (gameLevel: number[]) => void;
  setCharValue: (charIdx: number, char: string) => void;
  setSwitchToNewWord: () => void;
  setWordValidation: (wordValidation: IGameCharState[]) => void;
};
