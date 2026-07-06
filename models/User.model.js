import { types } from "pg";
import sequelize from "../config/database";
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
        type : DataTypes.STRING,
        allowNull : false
    },
},
{tableName : "user"}
)