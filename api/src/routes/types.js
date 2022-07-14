const { Router } = require("express");
const router = Router();
const { Type } = require("../db");
const axios = require("axios");

const url = "https://pokeapi.co/api/v2/type";

router.get("/", async (req, res) => {
  const typesApi = await axios.get(url);
  try {
    const types = typesApi.data.results;
    types.forEach((e) => {
      Type.findOrCreate({
        where: {
          name: e.name,
        },
      });
    });
    const allTypes = await Type.findAll();
    res.send(allTypes);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
