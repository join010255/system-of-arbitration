import {DataTypes} from "sequelize"
import sequelize from "../config/database.js";


const Arbitre = sequelize.define("Arbitre", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom : {
    type: DataTypes.STRING,
    allowNull: false
  },
  nationalite : {
    type: DataTypes.STRING,
    allowNull: false
  },
  confedeation: {
    type: DataTypes.ENUM(
      "uefa",
      "caf",
      "afc",
      "conmebol",
      "concacaf",
      "ofc"
    ),
    allowNull: false
  },
  categorie: {
    type: DataTypes.ENUM(
    "central",
    "assistant",
    "var",
    "avar",
    "fourth official"
  ),
    allowNull: false
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM(
      "actif",
      "suspendu",
      "blesse",
      "retraite"
    ),
    allowNull: false,
    defaultValue: "actif"
  },
  

},
{
  tableName: "arbitres",
}

)

export default Arbitre;