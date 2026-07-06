// validation the post request  and put body data
export const validationdAffectation = async(req, res, next) => {
    const {arbitreId, matchId, role} = req.body;
    if(!arbitreId || !matchId || !role) return res.status(404).json({message: "error in request"});
    next()
}
 
// validation the  post request and put body data from match
export const validationMatch = async(req, res, next) => {
    const {equipeDomicile, equipeExterieur, stade, villeHote, dateMatch, phase} = req.body;
    if(!equipeDomicile || !equipeExterieur || !stade || !villeHote || !dateMatch || !phase) return res.status(404).json({message: "error in request"});
    next()
}

export const validationarbite = async(req, res, next) => {
    const {nom, prenom, nationalite, confedeation, categorie, experience, statut} = req.body;
    if(!nom || !prenom || !nationalite || !confedeation || !categorie || !experience || !statut) return res.status(404).json({message: "error in request"});
    next()
}

export const validationLogin = async(req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password)  return res.status(404).json({message: "error in request"});
    next()
}

export const validationRegerster = async(req, res, next) => {
    const {}
}

