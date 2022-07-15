import React from "react";
import Card from "./Card/Card";
import "./Cards.css";

export default function Cards({ allPokemons }) {
  // console.log(allPokemons);
  return (
    <div>
      {allPokemons.length !== 0 ? allPokemons.map((pokemon, i) => (
        <Card
          key={i}
          image={pokemon.image}
          name={pokemon.name}
          type={pokemon.types}
          attack={pokemon.attack}
          id={pokemon.id}
        />
      )):
      <div>
        <h1>No pokemons found</h1>
      </div>
      }
    </div>
  )
}