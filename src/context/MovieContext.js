import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [daftarMovie, setDaftarMovie] = useState({
    list: null,
    selectedId: null,
    statusForm: "create",
  });

  return <MovieContext.Provider value={[daftarMovie, setDaftarMovie]}>{props.children}</MovieContext.Provider>;
};
