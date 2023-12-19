const Try = require("../module/try.module")
const User = require("../schema/user.schema")
const Err = require("../module/err.module")
const jwt = require("jsonwebtoken")
const mail = require("../module/mail.module")

const message = (link)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forgot Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          margin-top: 20px;
        }
    
        h1 {
          color: #333;
        }
    
        p {
          color: #555;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 3px;
        }
    
        .button:hover {
          background-color: #0056b3;
          text-color: white;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Forgot Your Password?</h1>
        <p>Don't worry, it happens to the best of us. Click the button below to reset your password:</p>
        <a href=${link} class="button">Reset Password</a>
        <p>If you didn't request a password reset, you can ignore this email - your account is secure.</p>
        <p>Thanks,<br>Your Company Name</p>
      </div>
    </body>
    
    </html>
    
    `
}

const emailVerification =Try(async(req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user) throw next(new Err(404,"User doesn't exists"))
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: "10m"})
    const forgotLink = `${process.env.CLIENT}password-change?token=${token}`
    const isSent = await mail(email,"forgot-password",message(forgotLink))
    if(!isSent) throw next(new Err(500,"internal server error"))
    next()
})

module.exports = emailVerification