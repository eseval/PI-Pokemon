const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const urlImage =
  "https://c0.klipartz.com/pngpicture/564/553/gratis-png-dibujos-de-pokemon-go-poke-ball-ash-ketchum-pokemon-go-thumbnail.png";

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      hp: {
        type: DataTypes.INTEGER,
      },
      attack: {
        type: DataTypes.INTEGER,
      },
      defense: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: urlImage,
      },
      created: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false, //false para evitar la creacion en la bd
    }
  );
};
