import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getTypes, postPokemon } from "../../actions";
import { Link, useHistory } from "react-router-dom";
import './Form.css';

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [attack, setAttack] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  if (
    currentPage > Math.ceil(allPokemons.length / pokemonsPerPage) &&
    currentPage !== 1
  ) {
    setCurrentPage(1);
  }

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || type === "" || attack === "" || image === "") {
      setError("Please fill all the fields");
    } else {
      dispatch(postPokemon(name, type, attack, image));
      history.push("/");
    }
  }
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  return (
    <div className="form">
      <h1>Create a new Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select a type</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="attack">Attack</label>
          <input
            type="text"
            className="form-control"
            id="attack"
            value={attack}
            onChange={(e) => setAttack(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>{error}</div>
    </div>
  );
}
