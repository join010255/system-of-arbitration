import Match from "../models/match.model.js"

class MatchManager{
    getAll = async (req, res) => {
        try{
            const match = await Match.findAll();
            if(match.length === 0) return res.status(404).json({message: "data note fond"})
            res.status(201).json(match)
        }catch(erro){
            console.log({error: erro.message})
        }
    }

    getByID = async (req, res) => {
        const id = req.params.id
        const data = await Match.findByPk(id)
        if(!data){
            return res.status(404).json({message: "id is not fond"})
        }
        res.status(200).json(data)
    }

    setData = async(req, res) => {
        try{
            
            const {equipeDomicile, equipeExterieur, stade, villeHote, dateMatch, phase} = req.body;
            // console.log({equipeDomicile, equipeExterieur, stade, villeHote, dateMatch, phase})
            await Match.create({
                equipeDomicile,
                equipeExterieur,
                stade,
                villeHote,
                dateMatch,
                phase
            })
            res.status(201).json({message: "ok"})
        }catch(error){
            console.log(error)
            res.status(401).json({message: "error in the server"})
        }
    }

    updateData = async(req, res) => {
        try{
            const id = req.params
            const match = Match.findByPk(id);

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
            const id = req.params
            const result = await Match.destroy({
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

export default MatchManager;