import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getPokemons, getTypes, postPokemon} from "../../actions";
import {Link, useHistory} from "react-router-dom";
import "./Form.css";

function validate(input) {
  let noEmpty = /\S+/;
  let validateName = /^.{3,15}$/;
  let errors = {};
  if (input.name[0] === " ") {
    errors.name = "Name cannot start with a blank space";
  } else if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3) {
    errors.name = "Name must be at least 3 characters and only contain letters";
  } else if (input.hp < 1 || input.hp > 100) {
    errors.attack = "Health points must be between 1 and 100";
  } else if (input.attack < 1 || input.attack > 100) {
    errors.attack = "Attack points must be between 1 and 100";
  } else if (input.defense < 1 || input.defense > 100) {
    errors.defense = "Defense points must be between 1 and 100";
  } else if (input.speed < 1 || input.speed > 100) {
    errors.speed = "Speed points must be between 1 and 100";
  } else if (input.height < 1 || input.height > 100) {
    errors.height = "Height points must be between 1 and 100";
  } else if (input.weight < 1 || input.weight > 100) {
    errors.weight = "Weight points must be between 1 and 100";
  } else if (input.types === "") {
    errors.types = "Please select a type";
  } else if (input.types > 2) {
    errors.types = "You can only select 2 types";
  } else if (!(/\.(gif|jpg|jpeg|png)$/).test(input.image)) {
    input.image && (errors.image = 'Please, this field must be a valid image')
  }
  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);
  // const allPokemons = useSelector((state) => state.pokemons);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
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
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(input)
    dispatch(postPokemon(input))
    dispatch(getPokemons())
    alert("Pokemon added successfully")
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
    })
    history.push("/home")
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }

  function handleTypesSelect(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      })
      setErrors(validate({
        ...input,
        types: [...input.types, e.target.value],
      }))
    } else {
      let filteredTypes = [...input.types]
      filteredTypes.splice(filteredTypes.indexOf(e.target.value), 1)
      setInput({
        ...input,
        types: filteredTypes,
      })
      setErrors(validate({
        ...input,
        types: filteredTypes,
      }))
    }
  }

  return (
    <div className="form-container">
      <div className="whole-form">
        <div>
          <Link to='/home'>
            <button>To Home</button>
          </Link>
        </div>
        <h1>Create your Pokemon!</h1>
        <br/>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <div>
              <label>Name: </label>
              <input
                className="input-name-form"
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <br/>
            <div className="attributes-form">
              <div>
                <label>HP:</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={input.hp}
                  name="hp"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="HP"
                />
                {input.hp}
                <p>{errors.hp}</p>
                <label>Attack:</label>
                <input
                  type="range"
                  value={input.attack}
                  name="attack"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Attack"
                />
                {input.attack}
                <p>{errors.attack}</p>
                <label>Defense:</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={input.defense}
                  name="defense"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Defense"
                />
                {input.defense}
                <p>{errors.defense}</p>
              </div>
              <div>
                <label>Speed:</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={input.speed}
                  name="speed"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Speed"
                />
                {input.speed}
                <p>{errors.speed}</p>
                <label>Height:</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={input.height}
                  name="height"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Height"
                />
                {input.height}
                <p>{errors.height}</p>
                <label>Weight:</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={input.weight}
                  name="weight"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Weight"
                />
                {input.weight}
                <p>{errors.weight}</p>
              </div>
            </div>
            <div>
              <label>Image: </label>
              <input
                className="input-image-form"
                type="text"
                name="image"
                value={input.image}
                placeholder={"Image URL"}
                onChange={(e) => {
                  handleChange(e)
                }}
              />
            </div>
            <div>
              <label className="types-title-form">Types: </label>
              <div>
                {allTypes.map((types, i) => {
                  return (
                    <div key={i} className="types-form">
                      <input
                        type="checkbox"
                        id={i}
                        name={types.name}
                        value={types.name}
                        onChange={(e) => {
                          handleTypesSelect(e)
                        }}
                      />
                      <label>{types.name.replace(types.name[0], types.name[0].toUpperCase())}</label>
                    </div>
                  )
                })}
                {errors.types && <p className="error">{errors.types}</p>}
              </div>
            </div>
            <div>
              <input className="input-button-form"
                type="submit"
                value={input.created}
                disabled={Object.keys(errors).length > 0 ||
                  input.name === "" ||
                  input.hp === "" ||
                  input.attack === "" ||
                  input.defense === "" ||
                  input.speed === "" ||
                  input.height === "" ||
                  input.weight === "" ||
                  input.types.length === 0 ||
                  input.types.length > 2
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}