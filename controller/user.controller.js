require("../module/db.module")
const User = require("../schema/user.schema")
const Try = require("../module/try.module")
const Err = require("../module/err.module")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = Try(async (req,res,next)=>{
        const user = new User(req.body)
        await user.save()
        res.status(200).json({success: true})
})

const login = Try(async(req,res,next)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})

    if(!user) throw next(new Err(401,"Invalid credentials"))

    const isLoged = await bcrypt.compare(password,user.password)
    if(!isLoged) throw next(new Err(401,"Invalid credentials"))

    user.password = undefined
    const access = jwt.sign(user.toJSON(),process.env.JWT_SECRET,{expiresIn: "15m"})    
    const refresh = jwt.sign(user.toJSON(),process.env.JWT_SECRET,{expiresIn: "7d"})    
    res.status(200).json({access,refresh})

})

const forgot = Try(async(req,res,next)=>{
    res.status(200).send("forgot")
})

module.exports = {
    register,
    login,
    forgot
}