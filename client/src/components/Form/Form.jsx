import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getTypes, postPokemon, getPokemons } from "../../actions";
import { Link, useHistory } from "react-router-dom";
import "./Form.css";

function validate(input) {}

export default function Form() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);
  let allPokemons = useSelector((state) => state.allPokemons);

  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert("Pokemon added successfully");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
      image: "",
    });
    history.push("/home");
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleTypeSelect(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          types: [...input.types, e.target.value],
        })
      );
    } else {
      let filt = [...input.types];
      filt.splice(filt.indexOf(e.target.value), 1);
      setInput({
        ...input,
        types: filt,
      });
      setErrors(
        validate({
          ...input,
          types: filt,
        })
      );
    }
  }

  return (
    <div>
      <div>
        <Link to="./home">
          <button>To Home</button>
        </Link>
      </div>
      <h1>Create your own Pokemon</h1>
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <br />
          <div>
            
          </div>
        </div>
      </form>
    </div>
  );
}
