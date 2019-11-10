import mongoose from 'mongoose'

const DocumentSchema = new mongoose.Schema({
  name: String,
  fields: [{ name: String, key: String }],
  attachmentID: String
})

mongoose.model('Document', DocumentSchema)

export default mongoose.model('Document')