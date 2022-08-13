import React, { FC } from "react";
import CharBox from "../CharBox";
import { IWordProps, IWordsGridProps } from "./WordsGrid.types";
import styles from "./WordsGrid.module.css";

const Word: FC<IWordProps> = ({ word }) => {
  return (
    <div className={styles.word}>
      {word.value.map((char, idx) => (
        <div className={styles.char} key={idx}>
          <CharBox char={char.value} state={char.state} />
        </div>
      ))}
    </div>
  );
};

const WordsGrid: FC<IWordsGridProps> = ({ words }) => {
  return (
    <div className={styles.container}>
      {words.map((word, rowIndex) => (
        <Word key={rowIndex} word={word} />
      ))}
    </div>
  );
};

export default WordsGrid;
