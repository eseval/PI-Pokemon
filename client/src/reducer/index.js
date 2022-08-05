const initialState = {
  pokemons: [],
  types: [],
  details: {},
  allPokemons: [],
  createPokemon: [],
  filters: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_POKEMON_BY_NAME":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_POKEMON_BY_ID":
      return {
        ...state,
        details: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = [...state.allPokemons];
      const typesFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((e) =>
            e.types && typeof e.types[0] === "string"
              ? e.types.includes(action.payload)
              : e.types && e.types.map((e) => e.name).includes(action.payload)
          );
      return {
        ...state,
        pokemons: typesFiltered,
        filters: typesFiltered,
      };
    case "ORDER_BY_NAME":
      let allPoke = [...state.pokemons];
      allPoke = allPoke.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === "Asc" ? -1 : 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === "Desc" ? -1 : 1;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : allPoke,
      };
    case "ORDER_BY_CREATION":
      let filter;
      if (state.filters.length === 0) {
        let allPokemonsCreated = [...state.allPokemons];
        filter =
          action.payload === "api"
            ? allPokemonsCreated.filter((e) => !isNaN(e.id) === true)
            : allPokemonsCreated.filter((e) => e.created === true);
        return {
          ...state,
          pokemons: action.payload === "all" ? allPokemonsCreated : filter,
        };
      } else if (state.filters.length > 0) {
        let allPokemonsCreated = [...state.filters];
        filter =
          action.payload === "api"
            ? allPokemonsCreated.filter((e) => !isNaN(e.id) === true)
            : allPokemonsCreated.filter((e) => e.created === true);
        return {
          ...state,
          pokemons: action.payload === "all" ? allPokemonsCreated : filter,
        };
      }
      return;
    case "ORDER_BY_ATTACK":
      let allPokemonsAttack = [...state.pokemons];
      allPokemonsAttack = allPokemonsAttack.sort((a, b) => {
        if (a.attack < b.attack) {
          return action.payload === "Asc" ? -1 : 1;
        }
        if (a.attack > b.attack) {
          return action.payload === "Desc" ? -1 : 1;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        pokemons:
          action.payload === "All" ? state.allPokemons : allPokemonsAttack,
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    case "CLEAR_STATE":
      return {
        ...state,
        details: action.payload,
      };
    case "DELETE_POKEMON":
      return {
        ...state,
        pokemons: state.pokemons.filter(e => e.id !== action.payload),
        allPokemons: state.allPokemons.filter(e => e.id !== action.payload),
      }
    default:
      return state;
  }
}
