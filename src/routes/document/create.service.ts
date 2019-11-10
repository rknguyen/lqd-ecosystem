import fs from 'fs'
import path from 'path'

const Pizzip = require('pizzip')
const Templater = require('docxtemplater')

function Make(filePath: string, data: object, outputPath: string) {
  const content = fs.readFileSync(filePath, 'binary')
  const document = (new Templater()).loadZip(new Pizzip(content))

  document.setData(data)
  try {
    document.render()
    const outputBuffer = document.getZip().generate({ type: 'nodebuffer' })
    fs.writeFileSync(outputPath, outputBuffer)
  }
  catch(error) {
    return error
  }
}

export { Make }