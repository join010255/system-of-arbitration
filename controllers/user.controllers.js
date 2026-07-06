import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import { Op, where } from "sequelize";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
class UserControle{
    login = async(req, res) => {
        try{
            const user = await User.findOne({
                where: {
                    username :  req.body.username
                }
            })
            if(!user) return res.status(404).json({message : "user note found"})
            
            const verfypasswords = bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!verfypasswords) return res.status(401).json({message: "Invalid username or password"})
            
            const token = jwt.sign(
                {
                    id : user.id,
                    username : user.username,
                    role : user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn : "12h"
                }
            )
            res.status(200).json({token : token})
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
            console.log(result)
            if(result) return res.status(409).json({message : "no regester"})
            const {body} = req.body;
            const paswordHash = await bcrypt.hash(body.password, 10)
            await User.create({
                username : body.username,
                email: body.email,
                password: paswordHash,
                role : body.role
            })
            res.status(201).json({message : "regester ok"})

        }catch(error){
            res.status(500).json({message : "regester error in the server"})
        }
    }
    
}


export default UserControle;