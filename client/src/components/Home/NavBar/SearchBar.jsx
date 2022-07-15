import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const [name, setName] = useState(" ");
  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonByName(name));
    setName("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    } else if (name[0] === " ") {
      setName(name.substring(1));
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for a pokemon"
          value={name}
          onChange={(e) => handleOnChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Search
        </button>
      </div>
    </div>
  );
}
