import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards/Cards";
import "./Home.css";
import ByCreation from "./NavBar/Filters/ByCreation";
import ByType from "./NavBar/Filters/ByType";
import ByAttack from "./NavBar/Filters/ByAttack";
import SearchBar from "./NavBar/SearchBar";
import AlphabeticalOrder from "./NavBar/Filters/AlphabeticalOrder";
import { getTypes, getPokemons } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Paginated from "./Paginated/Paginated";

export default function Home() {
  const allPokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
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
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  return (
    <div>
      <div>
        {/* <SearchBar /> */}
      </div>
      <Link to="/dog">Create a new Pokemon</Link>
      <h1>Let's catch them all</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Refresh
      </button>
      <div>
        {/* <ByAttack /> */}
        <AlphabeticalOrder />
        {/* <ByType /> */}
        {/* <ByCreation /> */}
      </div>
      <div>
        {/* <Paginated
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons}
          paginado={paginado}
          currentPage={currentPage}
        /> */}
      </div>
      <div>
        <Cards allPokemons={currentPokemons} />
      </div>
    </div>
  );
}
