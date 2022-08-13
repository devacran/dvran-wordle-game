import { Layout } from "antd";
import type { NextPage } from "next";
import { Button } from "antd";
import Link from "next/link";
import CharBox from "../components/Game/components/CharBox";
import styles from "./index.module.css";

const Home: NextPage = () => {
  return (
    <Layout className={styles["home-page"]}>
      <Layout.Header className={styles["home-header"]}>
        <h1>Wordle</h1>
      </Layout.Header>
      <Layout.Content className={styles.home}>
        <h2 className="text-center">Como Jugar</h2>
        <p>Adivina la palabra oculta en 5 intentos.</p>
        <p>Cada intento debe ser una palabra valida de 5 letras</p>
        <p>
          Despues de cada intento el or de las letras cambia para mostrar que
          tan cerca estas de acrtar la palabra.
        </p>
        <h4>Ejemplos</h4>
        <div className={styles.word}>
          <div className={styles.char}>
            <CharBox state="idle" char="G" />
          </div>
          <div className={styles.char}>
            <CharBox state="valid" char="A" />
          </div>
          <div className={styles.char}>
            <CharBox state="idle" char="T" />
          </div>
          <div className={styles.char}>
            <CharBox state="idle" char="O" />
          </div>
          <div className={styles.char}>
            <CharBox state="idle" char="S" />
          </div>
        </div>

        <p>
          La letra <strong>G</strong>está en la palabra y en la posición
          correcta.
        </p>
        <div className={styles.word}>
          <div className={styles.char}>
            <CharBox state="idle" char="V" />
          </div>
          <div className={styles.char}>
            <CharBox state="invalid" char="O" />
          </div>
          <div className={styles.char}>
            <CharBox state="idle" char="C" />
          </div>
          <div className={styles.char}>
            <CharBox state="idle" char="A" />
          </div>
          <div className={styles.char}>
            <CharBox state="idle" char="L" />
          </div>
        </div>
        <p>
          La letra <strong>C</strong>está en la palabra y pero en la posición
          incorrecta.
        </p>
        <div className={styles.word}>
          <div className={styles.char}>
            <CharBox state="idle" char="C" />
          </div>
          <div className={styles.char}>
            <CharBox state="valid" char="A" />
          </div>
          <div className={styles.char}>
            <CharBox state="idle" char="N" />
          </div>
          <div className={styles.char}>
            <CharBox state="idle" char="T" />
          </div>
          <div className={styles.char}>
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
        <Button type="primary" className={styles["start-button"]}>
          <Link href={"/game"}>!JUGAR</Link>
        </Button>
      </Layout.Content>
    </Layout>
  );
};
export default Home;
