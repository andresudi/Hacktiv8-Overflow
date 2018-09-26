var CronJob = require('cron').CronJob
const nodemailer = require('nodemailer');

function sendMail(email, name) {
    console.log(email);
    console.log(name);
    console.log('masuuuk');
    
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.email}`, // generated ethereal user
        pass: `${process.env.emailpass}` // generated ethereal password
      }
    });

    let mailOptions = {
        from: `${process.env.email}`, // sender address
        to: email, // list of receivers
        subject: 'Hacktiv-Overflow', // Subject line
        text: `Halo ${name}, welcome to hacktiv overflow`
        };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
}

module.exports = sendMail


