import React, { useContext } from "react";
import { GlobalStateContext } from "../GlobalStateContext";

const StartAgainButton = () => {
  let [globalState, setGlobalState] = useContext(GlobalStateContext);

  function handleStartAgain() {
    setGlobalState({ ...globalState, playlist: "" });
  }

  return (
    <svg
      className="display__start-again"
      onClick={handleStartAgain}
      width="95"
      height="95"
      viewBox="0 0 95 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47.5 95C21.266 95 0 73.734 0 47.5C0 21.266 21.266 0 47.5 0C73.734 0 95 21.266 95 47.5C95 73.734 73.734 95 47.5 95Z"
        fill="#FF6584"
      />
      <path
        d="M47.5001 28.5C52.4876 28.5 57.2376 30.4 60.8 33.9625C68.1625 41.325 68.1625 53.4375 60.8 60.8C56.5251 65.3125 50.5875 66.975 44.8876 66.2625L46.0751 61.5125C50.1125 61.9875 54.3876 60.5625 57.4751 57.475C62.9375 52.0125 62.9375 42.9875 57.4751 37.2875C54.8626 34.675 51.0625 33.25 47.5001 33.25V44.175L35.6251 32.3L47.5001 20.425V28.5ZM33.9626 60.8C27.7876 54.625 26.8376 45.125 31.1126 37.7625L34.6751 41.325C32.0626 46.55 33.0126 53.2 37.5251 57.475C38.7126 58.6625 40.1376 59.6125 41.8001 60.325L40.3751 65.075C38.0001 64.125 35.8626 62.7 33.9626 60.8Z"
        fill="#564FCC"
      />
    </svg>
  );
};

export default StartAgainButton;
