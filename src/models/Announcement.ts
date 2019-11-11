import mongoose from 'mongoose'

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  content: String
})

mongoose.model('Announcement', AnnouncementSchema)

export default mongoose.model('Announcement')