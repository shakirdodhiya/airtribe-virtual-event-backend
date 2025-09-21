const nodemailer = require('nodemailer');

exports.sendMail = async ({
  to,
  subject,
  html,
  attachments = null
}) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  })

  // Configure mail options
  const options = {
    from: "'Shakir' unknownwonder1120@gmail.com",
    to,
    subject,
    html,
    attachments : attachments
  }

  try{
    await transport.sendMail(options)
    return true
  }catch(error){
    console.log(error);
    return false
  }
}