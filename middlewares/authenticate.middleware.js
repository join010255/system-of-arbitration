import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const authenticate = async(req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message : "no token"});
    try{
        const header = token.split(" ")[1];
        console.log(header)
        const decode = jwt.verify(header, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(error){
        console.log(error);
        res.status(500).json({message : "your token is dad"});
    }
}

export default authenticate;