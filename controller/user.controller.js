require("../module/db.module")
const User = require("../schema/user.schema")

const register = async (req,res,next)=>{
    try
    {
        const user = new User(req.body)
        await user.save()
        res.status(200).json(user)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

const login = (req,res,next)=>{
    res.status(200).send("login")
}

const forgot = (req,res,next)=>{
    res.status(200).send("forgot")
}

module.exports = {
    register,
    login,
    forgot
}