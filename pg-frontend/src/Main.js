import React from "react";
import { GlobalStateProvider } from "./GlobalStateContext";
import App from "./App";

const Main = () => {
  return (
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  );
};

export default Main;
