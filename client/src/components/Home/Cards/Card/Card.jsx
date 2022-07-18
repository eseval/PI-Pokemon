import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import img from "../../../../images/unknown.png";

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
        {type ? type?.map((type => {
          if(typeof(type) === 'string') return (<li key={type}>{type.replace(type[0], type[0].toUpperCase())}</li>)
          else return (<li key={type.name}>{type.name.replace(type.name[0], type.name[0].toUpperCase())}</li>)
        })): 'No types found'}
      </div>
    </div>
  );
}
