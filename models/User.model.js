import sequelize from "../config/database.js";
import {DataTypes} from "sequelize"

const User = sequelize.define("User", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    username: {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull: false
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false
    },
    role : {
        type : DataTypes.ENUM(
            "admin",
            "commissaire",
            "arbitre",
            "consultation"
        ),
        allowNull : false
    },
},
{tableName : "user"}
)

export default User