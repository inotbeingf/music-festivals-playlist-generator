import React, { useState, useContext } from "react";
import { GlobalStateContext } from "../GlobalStateContext";
import SearchButton from "./SearchButton";

const SearchInput = () => {
  let [userInput, setUserInput] = useState("");
  let [globalState, setGlobalState] = useContext(GlobalStateContext);

  function handleSubmit(e) {
    e.preventDefault();
    setGlobalState({ ...globalState, loading: "true" });
    let query = userInput.replace(/ /g, "%20");
    fetch(
      `http://localhost:3000/createplaylist?userInput=${query}&accessToken=${globalState.token}&tracksPerArtist=1`
    )
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        setGlobalState({ ...globalState, loading: false, playlist: body });
      })
      .catch((error) => console.error(error));
  }

  function keyPressed(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <>
      <input
        onKeyDown={keyPressed}
        className="search__input"
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Search a music festival"
        type="text"
      ></input>
      <SearchButton handleSubmit={handleSubmit} />
    </>
  );
};

export default SearchInput;
