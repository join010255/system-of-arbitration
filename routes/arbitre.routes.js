import ArbitreManage from "../controllers/arbitre.controller.js"
import express from "express"
import { validationarbite } from "../middlewares/validate.middleware.js"
import {authenticate} from "../middlewares/authenticate.middleware.js";
import {authorize} from "../middlewares/authorize.middleware.js"

const routerAR = express.Router()
const arbitre = new ArbitreManage()

routerAR.get("/", arbitre.getAll)
routerAR.get("/:id", arbitre.getByID)
routerAR.post("/", validationarbite, authenticate, authorize("commissaire", "admin"), arbitre.setData)
routerAR.put("/:id", validationarbite, arbitre.updateData)
routerAR.delete("/:id", authenticate, authorize("admin"), arbitre.delete)

export default routerAR;