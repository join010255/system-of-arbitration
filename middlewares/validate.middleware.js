// validation the post request  and put body data
export const validationdAffectation = async(req, res, next) => {
    const {arbitreId, matchId, role} = req.body;
    if(!arbitreId || !matchId || !role) return res.status(404).json({message: "error in request"});
    const enumDataCheck = ["central", "assistant", "var", "avar", "4e"]
    if(!enumDataCheck.includes(role)) return res.status(404).json({message: "error in request"});
    next()
}
 
// validation the  post request and put body data from match
export const validationMatch = async(req, res, next) => {
    const {equipeDomicile, equipeExterieur, stade, villeHote, dateMatch, phase} = req.body;
   
    if(!equipeDomicile || !equipeExterieur || !stade || !villeHote || !dateMatch || !phase) return res.status(404).json({message: "error in request"});
    const matchPhase = ["Groupes", "8e", "4e", "demi", "finale"]
    if(!matchPhase.includes(phase)) return res.status(404).json({message: "error in request"});
    next()
}

export const validationarbite = async(req, res, next) => {
    const {nom, prenom, nationalite, confedeation, categorie, experience, statut} = req.body;
    if(!nom || !prenom || !nationalite || !confedeation || !categorie || !experience || !statut) return res.status(404).json({message: "error in request"});
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
    ) return res.status(404).json({message : "error in request"})
    next()
}

export const validationLogin = async(req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password)  return res.status(404).json({message: "error in request"});
    next()
}

export const validationRegerster = async(req, res, next) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) return res.status(404).json({message : "5ona da5le"})
    next()
}

