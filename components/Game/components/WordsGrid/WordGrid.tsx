import React, { FC } from "react";
import CharBox from "../CharBox";
import { IWordProps, IWordsGridProps } from "./WordsGrid.types";
import WordsGridStyles from "./WordsGrid.module.css";

const Word: FC<IWordProps> = ({ word }) => {
  return (
    <div className={WordsGridStyles.word}>
      {word.value.map((char, idx) => (
        <div key={idx}>
          <CharBox char={char.value} state={char.state} />
        </div>
      ))}
    </div>
  );
};
const WordsGrid: FC<IWordsGridProps> & { Word: FC<IWordProps> } = ({
  words,
}) => {
  return (
    <div className={WordsGridStyles.container}>
      {words.map((word, rowIndex) => (
        <Word key={rowIndex} word={word} />
      ))}
    </div>
  );
};

WordsGrid.Word = Word;
export default WordsGrid;
