import path from 'path'
import { Make } from '../filling.service'

try {
  Make(
    path.resolve(__dirname, 'intro.docx'), 
    { name: 'RK Nguyen', age: 17 }, 
    path.resolve(__dirname, 'rendered-intro.docx'))

  console.log('Created successfully')
}
catch(e) {
  console.error(e)
}