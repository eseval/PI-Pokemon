import React from "react";
import Card from "./Card/Card";
import "./Cards.css";
import loading from "../../../images/loading-pokeball.gif";

export default function Cards({allPokemons}) {
  // console.log(allPokemons);
  return (
    <div className='cards-cards'>
      {allPokemons.length !== 0 ? allPokemons.map((pokemon, i) => (
          <Card
            key={i}
            image={pokemon.image}
            name={pokemon.name}
            type={pokemon.types}
            attack={pokemon.attack}
            id={pokemon.id}
          />
        )) :
        <img className='loading-cards' src={loading} alt="No pokemons found"/>
      }
    </div>
  )
}