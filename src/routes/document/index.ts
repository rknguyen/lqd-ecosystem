import { Router } from 'express'
const formidable = require('express-formidable')

import Validator from '../../utils/validator'

import MustLogined from '../../middleware/authorize'
import MustBeAdmin from '../../middleware/admin'

import CreateDocumentHandler from './create.handler'
import CreateDocumentSchema from './create.schema'

import DeleteDocumentHandler from './delete.handler'
import DeleteDocumentSchema from './delete.schema'

import GetDocumentHandler from './get.handler'
import GetDocumentSchema from './get.schema'

const Document = Router()

// setting up document routes here
Document.get('/', MustLogined, Validator(GetDocumentSchema), GetDocumentHandler)
Document.post('/create', MustLogined, MustBeAdmin, formidable(), Validator(CreateDocumentSchema), CreateDocumentHandler)
Document.post('/delete', MustLogined, MustBeAdmin, Validator(DeleteDocumentSchema), DeleteDocumentHandler)

export default Document