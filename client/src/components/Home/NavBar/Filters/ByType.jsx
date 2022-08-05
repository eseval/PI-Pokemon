import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterPokemonsByType} from "../../../../actions";
import "./ByType.css";

export default function ByType() {
  const pokemons = useSelector((state) => state.allPokemons);
  let vacio = [];
  //eslint-disable-next-line
  const soloTypes = pokemons.map((poke) => {
    poke.types.forEach((e) => {
      if (!vacio.includes(e)) {
        if (!e.name) {
          vacio.push({name: e});
        } else {
          vacio.push(e);
        }
      }
    });
  });

  vacio = vacio.filter(
    (value, index, self) => index === self.findIndex((t) => t.name === value.name)
  );

  const dispatch = useDispatch();
  function handleOnChange(e) {
    e.preventDefault();
    dispatch(filterPokemonsByType(e.target.value));
  }

  return (
    <div>
      <div>By Types</div>
      <select className="byType-filter" onChange={(e) => handleOnChange(e)}>
        <option value="All">All</option>
        {vacio && vacio.map((e) => (
          <option value={e.name} key={e.name}>{e.name.replace(e.name[0], e.name[0].toUpperCase())}</option>))}
      </select>
    </div>
  );
}