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
      "UEFA",
      "CAF",
      "AFC",
      "CONMEBOL",
      "CONCACAF",
      "OFC"
    ),
    allowNull: false
  },
  categorie: {
    type: DataTypes.ENUM(
      "Central",
      "Assistant",
      "VAR",
      "AVAR",
      "Fourth Official"
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