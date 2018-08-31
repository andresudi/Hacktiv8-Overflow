var CronJob = require('cron').CronJob
const User = require('../models/user')
var nodemailer = require('nodemailer')

function cron (){
  var allUsers = []
  new CronJob('0 0 8 * * 1-5', function() {
    User.find({})
    .then(users => {
      users.forEach(user => {
        allUsers.push({name: user.name, email: user.email})
      })

      allUsers.forEach(dataUser => {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: true,
          auth: {
            user: `${process.env.email}`,
            pass: `${process.env.emailpass}`
          }
        })
          
        var mailOptions = {
          from: `${process.env.email}`,
          to: `${dataUser.email}`,
          subject: 'Hacktiv-Overflow Setia Anggraeni',
          text: `Halo ${dataUser.name}, welcome to hacktiv overflow`
        }
          
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error.message)
          } else {
            console.log(info.response)
          }
        })

      })
    })
    .catch(err => {
      console.log('Cron Job Failed to get users!')
    })
  }, null, true, 'Asia/Jakarta')
}

module.exports = cron