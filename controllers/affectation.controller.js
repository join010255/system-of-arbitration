import Affectation from "../models/affectation.model.js"
import Match from "../models/match.model.js"
import Arbitre from "../models/arbitre.model.js"

class AffectationManages{
    getAll = async (req, res) => {
        try{
            const arbitre = await Affectation.findAll({
                include : [
                    {
                        model: Match,
                        attributes : ["equipeDomicile", "equipeExterieur", "stade", "villeHote", "dateMatch"]
                    },
                    {
                        model: Arbitre,
                        attributes : ["nom", "prenom", "nationalite", "categorie", "statut"]

                    }
                ]
            });
            if(arbitre.length === 0) return res.status(404).json({message: "data note fond"})
            res.status(201).json(arbitre)
        }catch(erro){
            console.log({error: erro.message})
            res.status(500).json({erorr :  erro.message})
        }
    }

    getByID = async (req, res) => {
        const {id} = req.params.id
        const data = await Affectation.findByPk(id)
        if(!data){
            return res.status(404).json({message: "id is not fond"})
        }
        res.status(200).json(data)
    }

    setData = async(req, res) => {
        try{
            const {arbitreId, matchId, role} = req.body;
            const  checkarbitId  = await Arbitre.findByPk(arbitreId);
            const  checkMatchId  = await Match.findByPk(matchId);
            if(!checkarbitId) return res.status(404).json({message : "arbitid not fount"})
            if(!checkMatchId) return res.status(404).json({message : "matchId not found"})
            await Affectation.create({
                arbitreId,
                matchId, 
                role
            })
            res.status(201).json({message: "ok"})
        }catch(error){
            console.log(error)
            res.status(401).json({message: "error in the server"})
        }
    }

    updateData = async(req, res) => {
        try{
            const id = req.params.id
            const match = await Affectation.findByPk(id);

            if(!match){
                return res.status(404).json({message: "id is not fond"})
            }
            await match.update(req.body)
            res.status(201).json({message: "ok"})
        }catch(error){
            res.status(500).json({message: "update error"})
        }
    }

    delete = async(req, res) =>{
        try{
            const id = req.params.id
            const result = await Affectation.destroy({
                where : {id: id}
            })
            if(!result){
                res.status(401).json({message : "id is not fond delete"})
            }
            res.status(201).json({message : `${id} is delete`})
        }catch(error){
            res.status(500).json({message : `error`})
        }
    }

}

export default AffectationManages;