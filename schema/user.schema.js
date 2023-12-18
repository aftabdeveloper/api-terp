const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const {Schema} = mongoose
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function(){
    const password = await bcrypt.hash((this.password).toString(),12)
    this.password = password
})
userSchema.index({ email: 1}, { unique: true })

module.exports = mongoose.model("User",userSchema)