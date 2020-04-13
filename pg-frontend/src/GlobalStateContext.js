import React, { useState, createContext } from "react";

export const GlobalStateContext = createContext();

export const GlobalStateProvider = (props) => {
  let [globalState, setGlobalState] = useState({
    token: "",
    playlist: "",
    loading: false,
  });

  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
