import User from "../models/User.model.js";


const authorize = (...role) => {
    return async (req, res, next) =>{
        const id = req.user.id;
        try {
            const result = await User.findByPk(id);
            if(!role.includes(result.role)) return res.status(403).json({message : "Access denied"});
            next();
        } catch (error) {
            console.log(error)
        }
    }
}

export default authorize;