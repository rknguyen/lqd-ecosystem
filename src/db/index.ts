require('dotenv').config()

import mongoose from 'mongoose'

const { db_name } = process.env
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb://localhost:27017/${db_name}`, opts)

export default mongoose