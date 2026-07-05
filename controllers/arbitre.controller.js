import Arbitre from "../models/arbitre.model.js"

class ArbitreManage{
    getAll = async (req, res) => {
        try{
            const arbitre = await Arbitre.findAll(); // select * from arbitre
            if(arbitre.length === 0) return res.status(404).json({message: "data note fond"})
            res.status(201).json(arbitre)
        }catch(erro){
            console.log({error: "error from th"})
        }
    }
    getByID = async(req, res) => {
        try{
            const {id} = req.params;
            const data = await Arbitre.findByPk(id);
            
            if(!data) return res.status(404).json({message: "id is not fond"});

            res.status(200).json(data);
        
        }catch(error){
            res.status(500).json({message: "error from server"});
        } 
    }

    setData = async(req, res) => {
        try{
            const {nom, prenom, nationalite, confedeation, categorie, experience, statut} = req.body;
            console.log(req.body)
            const setDataa = await Arbitre.create({
                nom,
                prenom,
                nationalite,
                confedeation,
                categorie,
                experience,
                statut
            })
            res.status(201).json(setDataa)
        }catch(error){
            res.status(401).json({message: "error in the server"})
            console.log(error)
        }
    }

    updateData = async(req, res) => {
        try{
            const id = req.params
            const match = await Arbitre.findByPk(id.id);

            if(match.length === 0){
                return res.status(404).json({message: "id is not fond"})
            }
            await match.update(req.body)
            res.status(201).json({message: "ok"})
        }catch(error){
            res.status(500).json({message: "update error"})
            console.log(error)
            
        }
    }

    delete = async(req, res) =>{
        try{
            const id = req.params.id
            
            const result = await Arbitre.destroy({
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

export default ArbitreManage;