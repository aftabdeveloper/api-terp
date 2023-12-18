const {decrypt} = require("../module/crypto.module")

const validClient = (req,res,next)=>{
    const token = req.headers["x-auth-token"]
    if(!token) return res.status(400).send("Bad Request")

    const isValid = decrypt(token);
    if(!isValid) return res.status(400).send("Bad Request")
    
    next()
}

module.exports = validClient