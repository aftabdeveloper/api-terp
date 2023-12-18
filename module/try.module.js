const Try = (fn)=>{
    return (req,res,next)=>{
        return Promise.resolve(fn(req,res,next)).catch(next)
    }
}

module.exports = Try

// module.exports = (fn)=>(req,res,next)=>Promise
// .resolve(fn(req,res,next))
// .catch(next)