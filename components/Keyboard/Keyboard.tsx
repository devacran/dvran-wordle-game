import React, { FC } from "react";

import { KeyBoxProps } from "./KeyBox.types";

const Keyboard: FC<KeyBoxProps> = () => {
  return (
    <main>
      <header>
        <h1>Wordle</h1>
      </header>
      <section>
        <div>
          <KeyBox />
          <KeyBox />
          <KeyBox />
          <KeyBox />
          <KeyBox />
        </div>
      </section>
    </main>
  );
};
export default Keyboard;
