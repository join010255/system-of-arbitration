import UserControle from "../controllers/user.controllers.js";
import express from "express";
// import validationLogin from "../middlewares/validate.middleware.js"
import {validationRegerster, validationLogin} from "../middlewares/validate.middleware.js"



const routesUser = express.Router();

const users = new UserControle()

// Thes method  for login
routesUser.post("/login", validationLogin, users.login)

//The method for  reg
routesUser.post("/regester", validationRegerster, users.regester)

export default routesUser;