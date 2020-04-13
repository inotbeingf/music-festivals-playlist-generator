import React, { useContext } from "react";
import { GlobalStateContext } from "../GlobalStateContext";
import SearchInput from "../components/SearchInput";
import Loader from "react-loader-spinner";

const Search = () => {
  let [globalState] = useContext(GlobalStateContext);

  function ControlView({ loading }) {
    if (loading) {
      return (
        <Loader
          className="search__loader"
          type="Audio"
          color="#564fcc"
          height={150}
          width={150}
        />
      );
    } else {
      return <SearchInput />;
    }
  }

  return (
    <form className="search">
      <ControlView loading={globalState.loading} />
    </form>
  );
};

export default Search;
