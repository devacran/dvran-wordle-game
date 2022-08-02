import { IGameCharState } from "../../Game.types";

export type CharBoxProps = {
  char: string;
  state: IGameCharState;
};

export type ICharBox = {
  value: string;
  state: IGameCharState;
};
