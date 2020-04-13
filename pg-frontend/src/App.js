import React, { useEffect, useContext } from "react";
import SpotifyLogin from "./components/SpotifyLogin";
import Search from "./components/Search";
import DisplayPlaylist from "./components/DisplayPlaylist";
import Illustration from "./components/Illustration";
import { GlobalStateContext } from "./GlobalStateContext";

const App = () => {
  let [globalState, setGlobalState] = useContext(GlobalStateContext);

  let url = new URL(window.location.href);
  let accessToken = url.searchParams.get("access_token") || 0;

  useEffect(() => {
    if (accessToken) {
      window.history.pushState({}, document.title, "/");
      setGlobalState({ ...globalState, token: accessToken });
    }
  }, [globalState.token]);

  function ControlView({ playlist, token }) {
    if (token && !playlist) {
      return <Search />;
    } else if (token && playlist) {
      return <DisplayPlaylist />;
    } else {
      return null;
    }
  }

  return (
    <div id="app">
      <div className="box box__left">
        {!globalState.token && <SpotifyLogin />}
        <ControlView
          token={globalState.token}
          playlist={globalState.playlist}
        />
      </div>
      <div className="box box__right">
        <Illustration />
      </div>
    </div>
  );
};

export default App;
