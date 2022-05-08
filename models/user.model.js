// modules
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

// model
const userSchema = new mongoose.Schema(
  {
    pseudo:   { type: String, required: true, unique: true, minLength: 3, maxLength: 55, trimp: true },
    email:    { type: String, required: true, unique: true, validate: [isEmail], lowercase: true, trim: true },
    password: { type: String, required: true, minLength: 5, maxLength: 1024 }
  },
  { timestamps: true }
)

// proceed
userSchema.pre("save", async function(next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const UserModel = mongoose.model('user', userSchema)

// exportation user model
module.exports = UserModel
