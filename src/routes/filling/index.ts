import { Router } from 'express'
import Validator from '../../utils/validator'

import MustLogined from '../../middleware/authorize'

import CreateFillingHandler from './create.handler'
import CreateFillingSchema from './create.schema'

import DeleteFillingHandler from './delete.handler'
import DeleteFillingSchema from './delete.schema'

import UpdateFillingHandler from './update.handler'
import UpdateFillingSchema from './update.schema'

import GetFillingHandler from './get.handler'
import GetFillingSchema from './get.schema'

const Filling = Router()

// setting up document routes here
Filling.get('/', MustLogined, Validator(GetFillingSchema), GetFillingHandler)
Filling.post('/create', MustLogined, Validator(CreateFillingSchema), CreateFillingHandler)
Filling.post('/update', MustLogined, Validator(UpdateFillingSchema), UpdateFillingHandler)
Filling.post('/delete', MustLogined, Validator(DeleteFillingSchema), DeleteFillingHandler)

export default Filling