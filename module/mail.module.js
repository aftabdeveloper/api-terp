const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses")

const client = new SESClient({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const mail = async(to,subject,message,html=true)=>{
    let ToAddresses = Array.isArray(to) ? to : [to]
    const input = { 
        Source: process.env.SMTP_MAIL,
        Destination: { 
          ToAddresses
        },
        Message: { 
          Subject: { 
            Data: subject,
            Charset: "UTF-8",
          },
          Body: {}
        },
        ReplyToAddresses: [process.env.SMTP_MAIL]
      };

     if(html) input.Message.Body.Html = {Data: message, Charset: "UTF-8"}
     if(!html) input.Message.Body.Text = {Data: message, Charset: "UTF-8"}

      const command = new SendEmailCommand(input);
      try
      {
        await client.send(command);
        return true
      }
      catch(err)
      {
        return false
      }
}

module.exports = mail


