import * as z from "zod";

// validation the post request  and put body data

const validationAffectationZod = z.object({
    arbitreId: z.number().int({
        message: "arbitchId type is number"
    }),
    matchId: z.number().int({
        message: "matchId type is number"
    }),
    role: z.enum(["central", "assistant", "var", "avar", "4e"])
})

export const validationdAffectation = async(req, res, next) => {
    const result = validationAffectationZod.safeParse(req.body);
    if(!result) return res.status(400).json({message: "error in request"});
    next()
}
 
// create object zod validation match 
const validateMathZod = z.object({
    equipeDomicile: z.string().min(1, "error 1"),
    equipeExterieur: z.string().min(1, "error 2"),
    stade: z.string().min(1, "error 3"),
    villeHote: z.string().min(1, "error 4"),
    dateMatch: z.string().datetime(),
    phase: z.enum(["Groupes", "8e", "4e", "demi", "finale"])
    
})
export const validationMatch = async(req, res, next) => {
    const validtionResult = validateMathZod.safeParse(req.body);
    if(!validtionResult.success) return res.status(400).json({message: "error in request"});
    next()
}

// create object zod validation arbite
const validationArbritZod = z.object({
    nom: z.string().min(2),
    prenom: z.string().min(2),
    nationalite: z.string().min(2),
    confedeation: z.enum(["uefa", "caf", "afc", "conmebol", "concacaf", "ofc"]),
    categorie: z.enum(["central", "assistant", "var", "avar", "fourth official"]),
    experience: z.number().int({
        message : "Type error experience"
    }),
    statut: z.enum(["actif", "suspendu", "blesse", "retraite"])
});

export const validationarbite = async(req, res, next) => {
    const result = validationArbritZod.safeParse(req.body);
    if(!result.success) return res.status(400).json({message: "error in request"});
    next()
}

// zod object validtion to login 
const validateData = z.object({
    email : z.string().email().optional(),
    username : z.string().min(3).optional(),
    password : z.string().min(8)
}).refine((data) => data.email || data.username, {
    message : "email or username not found",
    path: ["email"]
});

export const validationLogin = async(req, res, next) => {
    const result = validateData.safeParse(req.body);
    if(!result.success){
        return res.statut(400).json({message : "error in login "})
    }
    next()
};

// i add zod in validationRegerster function

const validationRegesterZod = z.object({
    username : z.string().min(4, "error in username size"),
    email : z.string().min(1, "error in email size").email(),
    password: z.min(8, "error the password size 8"),
    role: z.enum(["admin", "commissaire", "arbitre", "consultation"])
});
export const validationRegerster = async(req, res, next) => {
    const result = validationRegesterZod.safeParse(req.body);
    if(!result.success) return res.status(400).json({message : "Role is not valid"});
    next()
};