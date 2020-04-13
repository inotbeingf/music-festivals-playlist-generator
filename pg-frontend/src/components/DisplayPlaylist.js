import React, { useContext } from "react";
import { GlobalStateContext } from "../GlobalStateContext";
import StartAgainButton from "./StartAgainButton";

export const DisplayPlaylist = () => {
  let [globalState] = useContext(GlobalStateContext);

  return (
    <>
      {globalState.playlist && (
        <div className="display">
          <StartAgainButton />
          <iframe
            title="Spotify Playlist"
            className="display__playlist"
            src={`https://open.spotify.com/embed/playlist/${globalState.playlist}`}
            width={300}
            height={380}
            frameBorder={0}
            allowtransparency="true"
            data-allow="encrypted-media"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default DisplayPlaylist;
