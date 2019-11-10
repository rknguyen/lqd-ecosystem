import mongoose from 'mongoose'

const FillingSchema = new mongoose.Schema({
  ownerID: String,
  documentID: String,
  fields: [{ value: String, key: String }]
})

mongoose.model('Filling', FillingSchema)

export default mongoose.model('Filling')