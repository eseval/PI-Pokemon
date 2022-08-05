import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";
import img from "../../../../images/unknown.png";
import {useDispatch} from "react-redux";
import {deletePokemon} from "../../../../actions";



export default function Card({image, name, type, attack, id}) {
  // console.log(type);
  const dispatch = useDispatch();
  function handleClick(e, id) {
    e.preventDefault()
    dispatch(deletePokemon(id))
  }
  return (
    <div className='card_card'>
      <div className='body-card'>
        <Link className='link-tittle-card' to={`/pokemons/${id}`}>
          <h1>{name.replace(name[0], name[0].toUpperCase())}</h1>
        </Link>
      </div>
      <div>
        <h4>Attack: {attack}</h4>
      </div>
      <img className='img_card'
        src={image ? image : img}
        alt="img not found"
        width="150px"
        height="150px"
      />
      <div className='list_types_card'>
        {type ? type?.map((type => {
          if (typeof (type) === 'string') return (<li key={type}>{type.replace(type[0], type[0].toUpperCase())}</li>)
          else return (<li key={type.name}>{type.name.replace(type.name[0], type.name[0].toUpperCase())}</li>)
        })) : 'No types found'}
      </div>
      <div>
        {typeof id === 'string' ? <button onClick={e=> handleClick(e, id)}>Delete</button> : null}
      </div>
    </div>
  );
}
