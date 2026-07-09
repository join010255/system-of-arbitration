import * as z from "zod";

// validation the post request  and put body data
export const validationdAffectation = async(req, res, next) => {
    const {arbitreId, matchId, role} = req.body;
    if(!arbitreId || !matchId || !role) return res.status(400).json({message: "error in request"});
    const enumDataCheck = ["central", "assistant", "var", "avar", "4e"]
    if(!enumDataCheck.includes(role)) return res.status(400).json({message: "error in request"});
    next()
}
 
// validation the  post request and put body data from match
export const validationMatch = async(req, res, next) => {
    const {equipeDomicile, equipeExterieur, stade, villeHote, dateMatch, phase} = req.body;
    if(!equipeDomicile || !equipeExterieur || !stade || !villeHote || !dateMatch || !phase) return res.status(400).json({message: "error in request"});
    const matchPhase = ["Groupes", "8e", "4e", "demi", "finale"]
    if(!matchPhase.includes(phase)) return res.status(400).json({message: "error in request"});
    next()
}

export const validationarbite = async(req, res, next) => {
    const {nom, prenom, nationalite, confedeation, categorie, experience, statut} = req.body;
    if(!nom || !prenom || !nationalite || !confedeation || !categorie || !experience || !statut) return res.status(400).json({message: "error in request"});
    const dataValidation = {
        confedeation : ["uefa", "caf", "afc", "conmebol", "concacaf", "ofc"],
        categorie : ["central", "assistant", "var", "avar", "fourth official"],
        statut : ["actif", "suspendu", "blesse", "retraite"]
    }
//next
    if(
        !dataValidation.confedeation.includes(confedeation) || 
        !dataValidation.categorie.includes(categorie) ||
        !dataValidation.statut.includes(statut)
    ) return res.status(400).json({message : "error in request"})
    next()
}

export const validationLogin = async(req, res, next) => {
    const  validateData = z.object({
        email : z.string().email(),
        password : z.string().min(8, "the password size is 8 len")
    })
    const {email, username, password} = req.body;
//return res.status(400).json({message: "error in request"});
    if(email || username && password){

    }
    next()
}

export const validationRegerster = async(req, res, next) => {
    const {username, email, password, role} = req.body;
    if(!username || !email || !password) return res.status(400).json({message : "5ona da5le"})
    const roles = ["admin", "commissaire", "arbitre", "consultation"];
    if(!roles.includes(role)) return res.status(400).json({message : "Role is not valid"});
    next()
}