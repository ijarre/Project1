import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [daftarGame, setDaftarGame] = useState({
    list: null,
    selectedId: null,
    statusForm: "create",
  });

  return <GameContext.Provider value={[daftarGame, setDaftarGame]}>{props.children}</GameContext.Provider>;
};
