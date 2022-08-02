import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemonsByType } from "../../../../actions";
import "./ByType.css";

export default function ByType() {
  const types = useSelector((state) => state.types);

  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    dispatch(filterPokemonsByType(e.target.value));
  }

  return (
    <div>
      <div>By Type</div>
      <select className="byType-filter" onChange={handleOnChange}>
        <option value="All">All</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.replace(type.name[0], type.name[0].toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
}
