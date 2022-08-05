require("dotenv").config();
const {key} = process.env;
const {Router} = require("express");
const router = Router();
const {Pokemon, Type} = require("../db");
const axios = require("axios");
const {Op} = require("sequelize");

const url = "https://pokeapi.co/api/v2/pokemon";

const getApiInfo = async () => {
  const pokeRequest1 = await axios.get(url);
  const pokeRequest2 = await axios.get(pokeRequest1.data.next);
  const allRequest = pokeRequest1.data.results.concat(
    pokeRequest2.data.results
  );
  const promises = allRequest.map((e) => axios.get(e.url));
  const allData = await Promise.all(promises);
  return allData.map((e) => {
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
      created: false,
    };
  });
};

const getApiName = async (name) => {
  try {
    const namesApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const results = namesApi.data;
    const pokemonInfo = {
      id: results.id,
      name: results.name,
      hp: results.stats[0]["base_stat"],
      attack: results.stats[1]["base_stat"],
      defense: results.stats[2]["base_stat"],
      speed: results.stats[5]["base_stat"],
      height: results.height,
      weight: results.weight,
      image: results.sprites.other["official-artwork"].front_default,
      types: results.types.map((e) => e.type.name),
      created: false,
    }
    return pokemonInfo;
  } catch (error) {
    console.log(error);
  }
}


const getDbInfo = async () => {
  return await Pokemon.findAll({
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
};

const getAllPokemons = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    return dbInfo.concat(apiInfo);
  } catch (error) {
    console.log(error);
  }
};

const getApiNames = async (name) => {
  try {
    const namesApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const allNames = namesApi.data.map((e) => {
      return {
        name: e.name,
        image: e.sprites.other["official-artwork"].front_default,
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const getPokemonsById = async (id) => {
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeData = {
    id: apiUrl.data.id,
    name: apiUrl.data.name,
    hp: apiUrl.data.stats[0]["base_stat"],
    attack: apiUrl.data.stats[1]["base_stat"],
    defense: apiUrl.data.stats[2]["base_stat"],
    speed: apiUrl.data.stats[5]["base_stat"],
    height: apiUrl.data.height,
    weight: apiUrl.data.weight,
    image: apiUrl.data.sprites.other["official-artwork"].front_default,
    types: apiUrl.data.types.map(e => e.type.name)
  };
  return pokeData;
};

router.get("/", async (req, res) => {
  const name = req.query.name;
  if (name) {
    const pokemonName = await getApiName(name.toLowerCase());
    if (pokemonName) {
      return res.status(200).send([pokemonName]);
    } else {
      const pokemonsDb = await getApiInfo();
      const pokemon = pokemonsDb.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
      return pokemon.length
        ? pokemon
        : res.status(404).send("Pokemon not found");
    }
  } else {
    const pokemonsTotal = await getAllPokemons();
    return res.status(200).send(pokemonsTotal);
  }
});

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    if (isNaN(id)) {
      const player = await Pokemon.findByPk(id,
        {
          include: {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            }
          }
        })
      res.json(player);
    } else {
      res.json(await getPokemonsById(id));
    }
  } catch (err) {
    next(err)
  }
});

router.post("/", async (req, res, next) => {
  const {name, hp, attack, defense, speed, height, weight, image, types} =
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
        const typesDb = await Type.findAll({where: {name: types}});
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
