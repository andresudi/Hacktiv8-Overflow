const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
},{
  timestamps: true
})

userSchema.pre('save', function(next) {
    let saltRound = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(this.password, saltRound)
    this.password = hash
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;
