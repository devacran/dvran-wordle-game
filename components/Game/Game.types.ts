export type IGameCharState = "idle" | "valid" | "invalid" | "disabled";
export type IGameProps = { baseWord: string };
export type IWordValidationResponse = {
  result: ("-1" | "0" | "1")[];
};
