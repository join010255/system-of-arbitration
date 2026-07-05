import Arbitre from "./arbitre.model.js";
import Match from "./match.model.js";
import Affectation from "./affectation.model.js";

Arbitre.hasMany(Affectation, {
    foreignKey: "arbitreId",
});

Affectation.belongsTo(Arbitre, {
    foreignKey: "arbitreId",
});

Match.hasMany(Affectation, {
    foreignKey: "matchId",
});

Affectation.belongsTo(Match, {
    foreignKey: "matchId"
});

export default {
    Arbitre,
    Match,
    Affectation
};