import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import GameProvider from "../components/Game/Game.state";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameProvider>
      <Component {...pageProps} />;
    </GameProvider>
  );
}

export default MyApp;
