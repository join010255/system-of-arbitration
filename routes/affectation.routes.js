import AffectationManages from "../controllers/affectation.controller.js"
import express from "express"
import { validationdAffectation } from "../middlewares/validate.middleware.js"
import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js"

const routerAff = express.Router()

const affectation = new AffectationManages()

// thes is all methods 
routerAff.get("/", affectation.getAll)
routerAff.get("/:id", affectation.getByID)
routerAff.put("/:id", validationdAffectation, authenticate, authorize("admin", "commissaire"), affectation.updateData)
routerAff.post("/", validationdAffectation, authenticate, authorize("admin", "commissaire"), affectation.setData)
routerAff.delete("/:id", authenticate, authorize("admin"), affectation.delete)

export default routerAff;