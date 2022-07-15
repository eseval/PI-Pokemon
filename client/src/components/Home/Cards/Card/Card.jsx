import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import img from "../../../../images/pokeball.jpeg";

export default function Card({ image, name, type, attack, id }) {
  // console.log(type);
  return (
    <div>
      <div>
        <Link to={`/pokemons/${id}`}>
          <h1>{name.replace(name[0], name[0].toUpperCase())}</h1>
        </Link>
      </div>
      <img
        src={image ? image : img}
        alt="img not found"
        width="150px"
        height="150px"
      />
      <div>
        {type.map((type, i) => (
          <p key={i}>{type.replace(type[0], type[0].toUpperCase())}</p>
        ))}
      </div>
    </div>
  );
}
