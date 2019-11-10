const { createModel } = require('mongoose-gridfs')

function createAttactmentModel() {
  return createModel({
    modelName: 'Attachment'
  })
}

export default createAttactmentModel