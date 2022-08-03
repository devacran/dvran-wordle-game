import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CharBox from "../components/Game/components/CharBox";
const Home: NextPage = (props) => {
  const { replace } = useRouter();
  // useEffect(() => {
  //   if (sessionStorage.getItem("baseWord")) {
  //     replace("/game");
  //   } else {
  //   }
  // }, []);

  return (
    <main className="container m-5 border rounded ">
      <div className="p-5">
        <h1 className="text-center">Como Jugar</h1>
        <p>Adivina la palabra oculta en 5 intentos.</p>
        <p>Cada intento debe ser una palabra valida de 5 letras</p>
        <p>
          Despues de cada intento el color de las letras cambia para mostrar que
          tan cerca estas de acrtar la palabra.
        </p>
        <h6>Ejemplos</h6>
        <div className="d-flex">
          <div className="col">
            <CharBox state="idle" char="G" />
          </div>
          <div className="col">
            <CharBox state="valid" char="A" />
          </div>
          <div className="col">
            <CharBox state="idle" char="T" />
          </div>
          <div className="col">
            <CharBox state="idle" char="O" />
          </div>
          <div className="col">
            <CharBox state="idle" char="S" />
          </div>
        </div>

        <p>
          La letra <strong>G</strong>está en la palabra y en la posición
          correcta.
        </p>
        <div className="d-flex">
          <div className="col">
            <CharBox state="idle" char="V" />
          </div>
          <div className="col">
            <CharBox state="invalid" char="O" />
          </div>
          <div className="col">
            <CharBox state="idle" char="C" />
          </div>
          <div className="col">
            <CharBox state="idle" char="A" />
          </div>
          <div className="col">
            <CharBox state="idle" char="L" />
          </div>
        </div>
        <p>
          La letra <strong>C</strong>está en la palabra y pero en la posición
          incorrecta.
        </p>
        <div className="d-flex">
          <div className="col">
            <CharBox state="idle" char="C" />
          </div>
          <div className="col">
            <CharBox state="valid" char="A" />
          </div>
          <div className="col">
            <CharBox state="idle" char="N" />
          </div>
          <div className="col">
            <CharBox state="idle" char="T" />
          </div>
          <div className="col">
            <CharBox state="disabled" char="O" />
          </div>
        </div>
        <p>
          La letra <strong>O</strong> no esta en la palabra.
        </p>

        <p>
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>

        <p>Una palabra nueva cada 5 min</p>
        <div className="btn btn-success">
          <Link href={"/game"}>!JUGAR</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
