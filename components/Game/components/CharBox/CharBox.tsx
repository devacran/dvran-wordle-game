import React, { FC } from "react";
import { CharBoxProps } from "./CharBox.types";

const CharBox: FC<CharBoxProps> = ({ state, char }) => {
  return (
    <div
      className={`key-box ${state}`}
      style={{ width: 80, height: 80, border: "2px solid black" }}
    >
      <div className="key-box-letter">
        <span>{char}</span>
      </div>
    </div>
  );
};

export default CharBox;
