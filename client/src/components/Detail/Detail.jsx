import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonById, clearState } from "../../actions";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getPokemonById(id));
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, id]);

  // console.log(details);
  return (
    <div>
      <div>
        <h1>{details.name}</h1>
        <img
          src={details[0]?.image}
          alt="pokemon"
          width="200px"
          height="200px"
        />
      </div>
      <div>
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
      <div>
        <h2>Attack</h2>
        <p>{details[0]?.attack}</p>
      </div>
      <div>
        <h2>Defense</h2>
        <p>{details[0]?.defense}</p>
      </div>
      <div>
        <h2>Speed</h2>
        <p>{details[0]?.speed}</p>
      </div>
      <div>
        <h2>HP</h2>
        <p>{details[0]?.hp}</p>
      </div>
      <div>
        <h2>Weight</h2>
        <p>{details[0]?.weight}</p>
      </div>
      <div>
        <h2>Height</h2>
        <p>{details[0]?.height}</p>
      </div>
    </div>
  );
}
