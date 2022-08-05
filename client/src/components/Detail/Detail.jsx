import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {clearState, getPokemonById} from "../../actions";
import img from "./../../images/loading.gif";
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
      <Link to="/home" className="link-to-form-home">Go Back!</Link>
      <div className="pokemon-details">
        <div className="detail-name">
          <h1>{details?.name?.replace(details.name[0], details.name[0].toUpperCase())}</h1>
        </div>
        <div>
          <img className="detail-image"
               src={details?.image ? details?.image : img}
               alt="pokemon"
               width="200px"
               height="200px"
          />
        </div>
        <div className="detail-types">
          <h2>Types</h2>
          <ul>
            {details?.types?.map((type) => {
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
          <h2>
            ID: {details?.id}
          </h2>
        </div>
        <div className="detail-attack">
          <h2>Attack: {details?.attack}</h2>
        </div>
        <div className="detail-defense">
          <h2>Defense: {details?.defense}</h2>
        </div>
        <div className="detail-speed">
          <h2>Speed: {details?.speed}</h2>
        </div>
        <div className="details-hp">
          <h2>HP: {details?.hp}</h2>
        </div>
        <div className="detail-weight">
          <h2>Weight: {details?.weight}</h2>
        </div>
        <div className="detail-height">
          <h2>Height: {details?.height}</h2>
        </div>
      </div>
    </div>
  );
}
