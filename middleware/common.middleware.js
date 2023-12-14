const path = require("path")
const fs = require("fs")
const blacklist = [
    "user"
]
const common = (req,res,next)=>{
    const {agent} = req.query
    if(!agent) return res.status(400).send("Bad request")
    const isExist = blacklist.find(item => item === agent.toLowerCase())
    if(isExist) return res.status(400).send("Bad request")

    const {dir: root} = path.parse(__dirname)
    const schema = path.join(root,"/schema/",`${agent}.schema.js`)
    try{
        fs.readFileSync(schema)
    }
    catch(err){
        return res.status(400).send("Bad request")
    }
    req.schema = `${agent}.schema.js`
    next()
}

module.exports = common