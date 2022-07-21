require("dotenv").config();
const { key } = process.env;
const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const url = "https://pokeapi.co/api/v2/pokemon";

const getApiInfo = async () => {
  // const pokeRequest1 = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=17');
  // const allRequest = pokeRequest1.data.results
  const pokeRequest1 = await axios.get(url);
  const pokeRequest2 = await axios.get(pokeRequest1.data.next);
  const allRequest = pokeRequest1.data.results.concat(
    pokeRequest2.data.results
  );
  /* ------------------- */
  // allRequest nos devuelve un array de objetos -- name y url
  /* ------------------- */
  // La línea de abajo nos devuelve todas las promesas
  const promises = allRequest.map((e) => axios.get(e.url));
  const allData = await Promise.all(promises);
  const pokeData = await allData.map((e) => {
    return {
      id: e.data.id,
      name: e.data.name,
      hp: e.data.stats[0]["base_stat"],
      attack: e.data.stats[1]["base_stat"],
      defense: e.data.stats[2]["base_stat"],
      speed: e.data.stats[5]["base_stat"],
      height: e.data.height,
      weight: e.data.weight,
      image: e.data.sprites.other["official-artwork"].front_default,
      types: e.data.types.map((e) => e.type.name),
    };
  });
  return pokeData;
};

const getDbInfo = async () => {
  const dbInfo = await Pokemon.findAll({
    include: [
      {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return dbInfo;
};

const getAllPokemons = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    return apiInfo.concat(dbInfo);
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res) => {
  const name = req.query.name;
  const pokemons = await getAllPokemons();
  // console.log("Pokemons--------: " + pokemons);
  if (name) {
    const pokemonsName = await pokemons.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    pokemons.length
      ? res.status(200).send(pokemonsName)
      : res.status(404).send("No pokemons found");
  } else {
    res.status(200).send(pokemons);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const pokemonsTotal = await getAllPokemons();
  try {
    if (!id.includes("-")) {
      const filterDetails = await pokemonsTotal.filter(
        (e) => e.id === Number(id)
      );
      filterDetails.length
        ? res.status(200).send(filterDetails)
        : res.status(404).send("No pokemons found");
    } else {
      let bdDetails = await Pokemon.findAll({
        where: { id },
        include: {
          model: Type,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      });
      bdDetails.length
        ? res.status(200).send(bdDetails)
        : res.status(404).send("No pokemons found");
    }
  } catch (error) {
    console.log(error);
  }
});


router.post("/", async (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;
  try {
    if (name) {
      const allPokemons = await getAllPokemons();
      const isPokemon = allPokemons.find((e) => e.name === name.toLowerCase());
      if (!isPokemon) {
        const pokemonsCreated = await Pokemon.create({
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          image,
        });
        const typesDb = await Type.findAll({ where: { name: types } });
        pokemonsCreated.addType(typesDb);
        return res.send("Pokemon created");
      }
      return res.send("Pokemon already exists");
    }
    if (!name) {
      res.status(400).send("No name provided");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
