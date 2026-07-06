import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import { Op, where } from "sequelize";


class UserControle{
    login = async(req, res) => {
        try{
            const user = await User.findOne({
                where: {
                    username :  req.body.username
                }
            })
            if(!user) return res.status(404).json({message : "user note fond"})
            
            const verfypasswords = bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!verfypasswords) return res.status(401).json({message: "Invalid username or password"})
        }catch(error){
            res.status(404).json({message : "data set sec"})
        }
    }
    regester = async(req, res) => {
        try{
            const result = User.findOne({
                where : {
                    [Op.or] : [
                        {username : req.body.username},
                        {email: req.body.email}
                    ]
                }
                
            })
            if(result) return res.status(409).json({message : "no regester"})
            await User.create(req.body)
            res.status(201).json({message : "regester ok"})

        }catch(error){
            res.status(500).json({message : "regester error in the server"})
        }
    }
    
}