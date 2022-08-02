import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {getTypes, postPokemon} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import "./Form.css";

const PokemonCreate = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const history = useHistory();

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

  let noEmpty = /\S+/;
  let validateName = /^[a-z]+$/i;
  let validateNum = /^\d+$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  const validate = (input) => {
    let errors = {};
    if (input.name[0] === " ") {
      errors.name = "Name cannot start with a blank space";
    } else if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3
    ) {
      errors.name =
        "Name must be at least 3 characters and only contain letters";
    } else if (!validateNum.test(input.hp) || parseInt(input.hp) < 1) {
      errors.hp = "Health points must be a positive number";
    } else if (!validateNum.test(input.attack) || parseInt(input.attack) < 1) {
      errors.attack = "Attack points must be a positive number";
    } else if (!validateNum.test(input.defense) || parseInt(input.defense) < 1) {
      errors.defense = "Defense points must be a positive number";
    } else if (!validateNum.test(input.speed) || parseInt(input.speed) < 1) {
      errors.speed = "Speed points must be a positive number";
    } else if (!validateNum.test(input.height) || parseInt(input.height) < 1) {
      errors.height = "Height points must be a positive number";
    } else if (!validateNum.test(input.weight) || parseInt(input.weight) < 1) {
      errors.weight = "Weight points must be a positive number";
    } else if (!validateUrl.test(input.image)) {
      errors.image = "URL required";
    }

    return errors;
  };

  const handleChange = (e) => {
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
  };

  const handleSelect = (e) => {
    if (input.types.length < 2) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      e.target.value = "Select type";
    } else {
      alert("Two types of pokemon at most");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !errors.name &&
      !errors.hp &&
      !errors.attack &&
      !errors.defense &&
      !errors.speed &&
      !errors.height &&
      !errors.weight &&
      !errors.image
    ) {
      dispatch(postPokemon(input));
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
      // dispatch(cleanPokemons(dispatch));
      history.push("/home");
    } else {
      alert("Error. Check the form");
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== e),
    });
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className="form-container">
      <div className="whole-form">
        <Link to="/home">
          <button className="button-form">Go Back</button>
        </Link>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2 className="form-title">Create a pokemon!</h2>
          <div>
            <label className="inputs-form">Name: </label>
            <input className="input-name-form"
                   type="text"
                   value={input.name}
                   name="name"
                   onChange={(e) => {
                     handleChange(e);
                   }}
                   placeholder="Name"
            />
            <p>{errors.name}</p>
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
            <label className="inputs-form">Image: </label>
            <input className="input-image-form"
                   type="url"
                   value={input.image}
                   name="image"
                   onChange={(e) => {
                     handleChange(e);
                   }}
                   placeholder="URL Image..."
            />
            <p>{errors.image}</p>
          </div>
          <div>
            <select className="input-types-form"
                    onChange={(e) => {
                      handleSelect(e);
                    }}
            >
              <option>Select the type</option>
              {types?.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {
              input.types.map((e) => {
                return (
                  <div key={e}>
                    <p>{e}</p>
                    <button
                      onClick={() => {
                        handleDelete(e);
                      }}
                    >
                      x
                    </button>
                  </div>
                );
              })
            }
          </div>
          <button className="submit-button" type="submit">Create!</button>
        </form>
      </div>
    </div>
  );
};

export default PokemonCreate;
