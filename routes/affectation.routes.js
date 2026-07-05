import AffectationManages from "../controllers/affectation.controller.js"
import express from "express"
import { validationdAffectation } from "../middlewares/validate.middleware.js"

const routerAff = express.Router()

const affectation = new AffectationManages()

// thes is all methods 
routerAff.get("/", affectation.getAll)
routerAff.get("/:id", affectation.getByID)
routerAff.put("/:id", validationdAffectation, affectation.updateData)
routerAff.post("/", validationdAffectation, affectation.setData)
routerAff.delete("/:id", affectation.delete)

export default routerAff;