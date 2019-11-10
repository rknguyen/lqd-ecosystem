import express from 'express'

import DocumentRoute from './document'
import FillingRoute from './filling'

function Setup(app: express.Application) {
  app.use('/document', DocumentRoute)
  app.use('/filling', FillingRoute)
}

export default Setup