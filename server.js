import express from "express";
import sequelize from "./config/database.js";
import routerAR from './routes/arbitre.routes.js';
import routerMatch from "./routes/match.routes.js";
import routerAff from "./routes/affectation.routes.js";


async function main(){
    const app = express()
    app.use(express.json())
    app.use('/arbite', routerAR)
    app.use('/match', routerMatch)
    app.use('/affextaion', routerAff)
    try{    
        await sequelize.authenticate();
        console.log("database has conetiond")
        await sequelize.sync()
    }catch(error){
        console.log(error)
    }

    app.listen(20514, () => {
        console.log("server is conactd")
    })
}
main()