import mongoose from 'mongoose'

const AdminsSchema = new mongoose.Schema({
  userID: String
})

mongoose.model('Admins', AdminsSchema)

export default mongoose.model('Admins')