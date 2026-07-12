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
                    [Op.or] : [{username :  req.body.login}, {email : req.body.login}] 
                }
            })
            console.log("memmi")
            if(!user) return res.status(404).json({message : "user note found"})
            // console.log(user)
            const verfypasswords = bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!verfypasswords) return res.status(401).json({message: "Invalid username or password"})
            
            const acessToken = jwt.sign(
                {
                    id : user.id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn : "15m"
                }
            );
            const refreshToken = jws.sign(
                {
                    id : user.id
                },
                process.env.JWT_REFRESH_SECRET,
                {
                    expiresIn : "7d"
                }
            )
            res.status(200).json({acessToken : acessToken, refreshToken : refreshToken})
        }catch(error){
            console.log(error)
            res.status(404).json({message : "data set sec"})
        }
    }
    regester = async(req, res) => {
        try{
            const result = await User.findOne({
                where : {
                    [Op.or] : [
                        {username : req.body.username},
                        {email: req.body.email}
                    ]
                }
            })
            if(result) return res.status(409).json({message : "no regester"})
            const checkAdmin = await User.findOne({
                where : {role : req.body.role}
            })
            
            if(checkAdmin && req.body.role.toLowerCase() === "admin") return res.status(403).json({message: "Admin registration is not allowed."})

            const paswordHash = await bcrypt.hash(req.body.password, 10)
            console.log(paswordHash)
            await User.create({
                username : req.body.username,
                email: req.body.email,
                password: paswordHash,
                role : req.body.role
            })
            res.status(201).json({message : "regester ok"})

        }catch(error){
            console.log(error) 
            res.status(500).json({message : "regester error in the server"})
        }
    
    changePasswords = async(req, res) =>{
        try{
            const userResult = User.findOne({
                where : {username : req.body.username}
            });
            if(!userResult) return res.status(404).json({message : "user not found"});
            const comparePassowrd = bcrypt.compare(
                req.body.password1,
                userResult.password
            );

            if(!comparePassowrd){
                return res.status(401).json({message : 'password is false'})
            }else if(req.body.password2 !== req.body.password3) return res.status(401).json({message : "passwords error"})
            
            const newPasswordHash = await bcrypt.hash(req.body.password3, 10)
            userResult.password = newPasswordHash;

            await userResult.save();

        }catch(error){
            res.status(500).json({message : error.message});
        }
    }

    }
    
}


export default UserControle;