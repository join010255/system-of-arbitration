import MatchManager from "../controllers/match.controller.js";
import express from "express";
import { validationMatch } from "../middlewares/validate.middleware.js";


const routerMatch = express.Router()

const matchManager = new MatchManager()


// thes is all methods 
routerMatch.get("/", matchManager.getAll)
routerMatch.get("/:id", matchManager.getByID)
routerMatch.put("/:id", validationMatch, matchManager.updateData)
routerMatch.post("/", validationMatch, matchManager.setData)
routerMatch.delete("/:id", matchManager.delete)

export default routerMatch;