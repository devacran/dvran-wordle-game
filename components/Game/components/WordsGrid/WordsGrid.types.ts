import { ICharBox } from "../CharBox/CharBox.types";

export type IGameWord = {
  value: ICharBox[];
  baseValue: string;
};
export type IWordsGridProps = {
  words: IGameWord[];
  level?: "basic";
};
export type IWordProps = {
  word: IGameWord;
};
