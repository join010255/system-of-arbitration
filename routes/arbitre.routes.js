import ArbitreManage from "../controllers/arbitre.controller.js"
import express from "express"
import { validationarbite } from "../middlewares/validate.middleware.js"

const routerAR = express.Router()

const arbitre = new ArbitreManage()

routerAR.get("/", arbitre.getAll)
routerAR.get("/:id", arbitre.getByID)
routerAR.post("/", validationarbite, arbitre.setData)
routerAR.put("/:id", validationarbite, arbitre.updateData)
routerAR.delete("/:id", arbitre.delete)

export default routerAR;