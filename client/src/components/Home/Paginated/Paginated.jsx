import React from "react";
import "./Paginated.css";

export default function Paginated({
                                    pokemonsPerPage,
                                    allPokemons,
                                    paginado,
                                    currentPage,
                                  }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextDisabled = currentPage === pageNumbers.length;

  const prevDisabled = currentPage === 1;

  return (
    <div>
      <div>
        <button
          disabled={prevDisabled}
          onClick={() => paginado(currentPage - 1)}
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginado(number)}>
            {number}
          </button>
        ))}
        <button
          disabled={nextDisabled}
          onClick={() => paginado(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
