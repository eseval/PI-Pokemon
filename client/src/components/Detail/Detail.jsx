import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {clearState, getPokemonById} from "../../actions";
import "./Detail.css";

export default function Detail() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getPokemonById(id));
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, id]);

  console.log(details);
  return (
    <div className='detail-whole'>
      <div className="pokemon-details">
        <div className="detail-name">
          <h1>{details[0]?.name.replace(details[0].name[0], details[0].name[0].toUpperCase())}</h1>
        </div>
        <div>
          <img className="detail-image"
            src={details[0]?.image}
            alt="pokemon"
            width="200px"
            height="200px"
          />
        </div>
        <div className="detail-types">
          <h2>Types</h2>
          <ul>
            {details[0]?.types?.map((type) => {
              if (typeof type === "string") {
                return (
                  <li key={type}>
                    {type.replace(type[0], type[0].toUpperCase())}
                  </li>
                );
              } else {
                return (
                  <li key={type.name}>
                    {type.name.replace(type.name[0], type.name[0].toUpperCase())}
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="detail-attack">
          <h2>Attack: {details[0]?.attack}</h2>
        </div>
        <div className="detail-defense">
          <h2>Defense: {details[0]?.defense}</h2>
        </div>
        <div className="detail-speed">
          <h2>Speed: {details[0]?.speed}</h2>
        </div>
        <div className="details-hp">
          <h2>HP: {details[0]?.hp}</h2>
        </div>
        <div className="detail-weight">
          <h2>Weight: {details[0]?.weight}</h2>
        </div>
        <div className="detail-height">
          <h2>Height: {details[0]?.height}</h2>
        </div>
      </div>
    </div>
  );
}
