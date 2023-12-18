const Try = require("../module/try.module")

const fetch = async (req,res,next)=>{
    const Schema = require(`../schema/${req.schema}`)
    const data = await Schema.find()
    res.status(200).json(data)
} 

const fetchById = Try(async (req,res,next)=>{
        const Schema = require(`../schema/${req.schema}`)
        const data = await Schema.findById(req.params.id)
        res.status(200).json(data)
})

const create = Try(async (req,res,next)=>{
        const Schema = require(`../schema/${req.schema}`)
        const schema =  new Schema(req.body)
        await schema.save()  
        res.status(200).json(schema)
})

const update = Try(async (req,res,next)=>{
        const Schema = require(`../schema/${req.schema}`)
        await Schema.updateOne({_id: req.params.id},req.body)
        res.status(200).json({success: true})
})

const remove = Try(async (req,res,next)=>{
        const Schema = require(`../schema/${req.schema}`)
        await Schema.deleteOne({_id: req.params.id})
        res.status(200).json({success: true})
})

module.exports = {
    fetch,
    create,
    update,
    fetchById,
    remove
}