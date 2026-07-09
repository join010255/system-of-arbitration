import MatchManager from "../controllers/match.controller.js";
import express from "express";
import { validationMatch } from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js"


const routerMatch = express.Router()
const matchManager = new MatchManager()

// thes is all methods
routerMatch.get("/", matchManager.getAll)
routerMatch.get("/:id", matchManager.getByID)
routerMatch.put("/:id", validationMatch, authenticate , authorize("commissaire", "admin"), matchManager.updateData)
routerMatch.post("/", validationMatch, authenticate, authorize("commissaire", "admin"), matchManager.setData)
routerMatch.delete("/:id", authenticate, authorize("admin"), matchManager.delete)

export default routerMatch;