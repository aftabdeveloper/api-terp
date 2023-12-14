const fetch = async (req,res,next)=>{
    const Schema = require(`../schema/${req.schema}`)
    const data = await Schema.find()
    res.status(200).json(data)
} 

const fetchById = async (req,res,next)=>{
    try
    {
        const Schema = require(`../schema/${req.schema}`)
        const data = await Schema.findById(req.params.id)
        res.status(200).json(data)

    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

const create = async (req,res,next)=>{
    try
    {
        const Schema = require(`../schema/${req.schema}`)
        const schema =  new Schema(req.body)
        await schema.save()  
        res.status(200).json(schema)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

const update = async (req,res,next)=>{
    try{
        const Schema = require(`../schema/${req.schema}`)
        await Schema.updateOne({_id: req.params.id},req.body)
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

const remove = async (req,res,next)=>{
    try{
        const Schema = require(`../schema/${req.schema}`)
        await Schema.deleteOne({_id: req.params.id})
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
module.exports = {
    fetch,
    create,
    update,
    fetchById,
    remove
}