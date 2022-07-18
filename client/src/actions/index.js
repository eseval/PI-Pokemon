import axios from "axios";

// export function getPokemons() {
//   return async function (dispatch) {
//     try {
//       let json = await axios.get("/pokemons");
//       return dispatch({
//         type: "GET_POKEMONS",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export function getPokemons() {
  return async function (dispatch) {
    try {
      await axios.get("/pokemons").then(function (json) {
        return dispatch({
          type: "GET_POKEMONS",
          payload: json.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/pokemons?name=${name}`);
      return dispatch({
        type: "GET_POKEMON_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      if (name[0] === " ") {
        alert("Please, enter a valid name");
      } else {
        alert("Pokemon not found");
      }
      console.log(error);
    }
  };
}

export function getPokemonById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/pokemons/${id}`);
      return dispatch({
        type: "GET_POKEMON_BY_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return function (dispatch) {
    try {
      axios.get("/types").then(function (json) {
        return dispatch({
          type: "GET_TYPES",
          payload: json.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}

export function orderByCreation(payload) {
  return {
    type: "ORDER_BY_CREATION",
    payload,
  };
}

export function postPokemon(pokemon) {
  return async function (dispatch) {
    const created = await axios.post("/pokemons", pokemon);
    return created;
  };
}

export function clearState() {
  return {
    type: "CLEAR_STATE",
    payload: {},
  };
}
