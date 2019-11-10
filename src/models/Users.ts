import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
  username: String,
  services: { 
    password: { 
      bcrypt: String 
    } 
  }
})

mongoose.model('Users', UsersSchema)

export default mongoose.model('Users')