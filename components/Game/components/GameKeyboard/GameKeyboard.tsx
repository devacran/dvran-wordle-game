import React, { FC } from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import classes from "./GameKeyboard.module.css";
type IGameKeyboardProps = {
  handleKeyClick: (key: string) => void;
};
const GameKeyboard: FC<IGameKeyboardProps> = ({ handleKeyClick }) => {
  const keyboardProps: KeyboardReactInterface["options"] = {
    onKeyPress: handleKeyClick,
    layout: {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "{enter} z x c v b n m {bksp}",
      ],
    },
    theme: "hg-theme-default loco" + " " + classes["game-keyboard"],
    buttonTheme: [
      {
        class: classes["game-keyboard-button"],
        buttons: `q w e r t y u i o p a s d f g h j k l {enter} z x c v b n m {bksp}`,
      },
    ],
  };

  return (
    <>
      <Keyboard {...keyboardProps} />
    </>
  );
};
export default GameKeyboard;
