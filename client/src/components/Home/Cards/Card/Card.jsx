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
          <h1>{name}</h1>
        </Link>
      </div>
      <img
        src={image ? image : img}
        alt="img not found"
        width="150px"
        height="150px"
      />
      <div>
        {/* {type.map((type, i) => (
          <p key={i}>{type}</p>
        ))} */}

  {/* {temperament ? temperament?.map((e => {
              if(typeof(e) === 'string') return (<span key={e}>{e + ', '}</span>)
              else return (<span key={e.name}>{e.name + ', '}</span>)
          })) : 'This breed does not have recorded temperaments'} */}

        {type ? type?.map((type => {
          if(typeof(type) === 'string') return (<span key={type}>{type}</span>)
          else return (<span key={type.name}>'Type'</span>)
        })): 'No types found'}
      </div>
    </div>
  );
}
