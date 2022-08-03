import React, { FC } from "react";
import { CharBoxProps } from "./CharBox.types";
import CharBoxStyles from "./CharBox.module.css";
const CharBox: FC<CharBoxProps> = ({ state, char }) => {
  return (
    <div
      className={`${CharBoxStyles.container} border rounded ${CharBoxStyles.idle} ${CharBoxStyles[state]} `}
    >
      <div className={CharBoxStyles.character}>
        <span>{char}</span>
      </div>
    </div>
  );
};

export default CharBox;
