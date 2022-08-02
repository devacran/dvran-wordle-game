import React, { FC } from "react";
import CharBox from "../CharBox";
import { IWordProps, IWordsGridProps } from "./WordsGrid.types";

const Word: FC<IWordProps> = ({ word }) => {
  return (
    <div style={{ display: "flex" }}>
      {word.value.map((char, idx) => (
        <CharBox key={idx} char={char.value} state={char.state} />
      ))}
    </div>
  );
};
const WordsGrid: FC<IWordsGridProps> & { Word: FC<IWordProps> } = ({
  words,
}) => {
  return (
    <>
      {words.map((word, rowIndex) => (
        <Word key={rowIndex} word={word} />
      ))}
    </>
  );
};

WordsGrid.Word = Word;
export default WordsGrid;
