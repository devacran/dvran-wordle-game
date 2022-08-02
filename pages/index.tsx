import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import KeyBox from "../components/Game/components/CharBox";

const Home: NextPage = (props) => {
  const { replace } = useRouter();
  // useEffect(() => {
  //   if (sessionStorage.getItem("baseWord")) {
  //     replace("/game");
  //   } else {
  //   }
  // }, []);

  return (
    <main>
      <h1>Como Jugar</h1>
      <p>Adivina la palabra oculta en 5 intentos.</p>
      <p>Cada intento debe ser una palabra valida de 5 letras</p>
      <p>
        Despues de cada intento el color de las letras cambia para mostrar que
        tan cerca estas de acrtar la palabra.
      </p>
      <h3>Ejemplos</h3>
      <KeyBox state="idle" char="G" />
      <KeyBox state="correct" char="A" />
      <KeyBox state="idle" char="T" />
      <KeyBox state="idle" char="O" />
      <KeyBox state="idle" char="S" />
      <p>
        La letra <strong>G</strong>está en la palabra y en la posición correcta.
      </p>
      <KeyBox state="idle" char="V" />
      <KeyBox state="incorrect" char="O" />
      <KeyBox state="idle" char="C" />
      <KeyBox state="idle" char="A" />
      <KeyBox state="idle" char="L" />
      <p>
        La letra <strong>C</strong>está en la palabra y pero en la posición
        incorrecta.
      </p>
      <KeyBox state="idle" char="C" />
      <KeyBox state="idle" char="A" />
      <KeyBox state="idle" char="N" />
      <KeyBox state="idle" char="T" />
      <KeyBox state="disabled" char="O" />
      <p>
        La letra <strong>O</strong> no esta en la palabra.
      </p>

      <p>
        Puede haber letras repetidas. Las pistas son independientes para cada
        letra.
      </p>

      <p>Una palabra nueva cada 5 min</p>
      <Link href={"/game"}>!JUGAR</Link>
    </main>
  );
};

export default Home;
