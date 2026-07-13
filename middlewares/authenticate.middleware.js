import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validationRefreshToken from "./valide.refresh.tk.js"

dotenv.config()

const authenticate = async(req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message : "no token"});
    console.log(token)
    try{
        // const header = token.split(" ")[1];
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(error){
        
        res.status(500).json({message : "your token is dad"});
    }
}

export default authenticate;