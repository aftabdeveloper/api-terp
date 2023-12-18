class Err extends Error {
    constructor(status,message){
        super(message)
        this.statusCode = status
        Error.captureStackTrace(this,this.constructor)
    }

}

module.exports = Err