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

export type IGameStateAction =
  | { type: "SET_SWITCH_TO_NEW_WORD" }
  | { type: "SET_CHAR_VALUE"; payload: { charValue: string; charIdx: number } }
  | { type: "SET_WORD_VALIDATION"; payload: IGameCharState[] }
  | { type: "SET_BASE_WORD"; payload: string }
  | { type: "SET_SCORE"; payload: number }
  | { type: "SET_WORDS"; payload: IGameWord[] }
  | { type: "SET_IS_GAME_OVER"; payload: boolean }
  | { type: "SET_CURRENT_WORD_INDEX"; payload: number }
  | { type: "SET_CURRENT_CHAR_INDEX"; payload: number }
  | { type: "SET_CURRENT_WORD_REF"; payload: IGameWord }
  | { type: "SET_GAME_LEVEL"; payload: [number, number] }
  | { type: "SET_INIT_GAME"; payload: Omit<IGameState, "currentWordRef"> };

export type IGameActions = {
  setBaseWord: (baseWord: string) => void;
  setScore: (score: number) => void;
  setWords: (words: IGameWord[]) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  setCurrentWordIndex: (currentWordIndex: number) => void;
  setCurrentCharIndex: (currentCharIndex: number) => void;
  setCurrentWordRef: (currentWordRef: IGameWord) => void;
  setGameLevel: (gameLevel: [number, number]) => void;
  setCharValue: (charIdx: number, char: string) => void;
  setSwitchToNewWord: () => void;
  setWordValidation: (wordValidation: IGameCharState[]) => void;
  setInitGame: (gameState: Omit<IGameState, "currentWordRef">) => void;
};
