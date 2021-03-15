import React from "react";
import { MovieProvider } from "./context/MovieContext";
import { GameProvider } from "./context/GameContext";
import { UserProvider } from "./context/UserContext";
import "./App.css";
import Main from "./Layout/Main";

function App() {
  return (
    <>
      <UserProvider>
        <MovieProvider>
          <GameProvider>
            <Main />
          </GameProvider>
        </MovieProvider>
      </UserProvider>
    </>
  );
}

export default App;
