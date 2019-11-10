import { Router } from 'express'
import Validator from '../../utils/validator'

import MustLogined from '../../middleware/authorize'
import MustBeAdmin from '../../middleware/admin'

import DeleteUserHandler from './delete.handler'
import DeleteUserSchema from './delete.schema'

import SetAdminHandler from './setAdmin.handler'
import SetAdminSchema from './setAdmin.schema'

import RemoveAdminHandler from './removeAdmin.handler'
import RemoveAdminSchema from './removeAdmin.schema'

const Users = Router()

// setting up document routes here
Users.post('/delete', MustLogined, MustBeAdmin, Validator(DeleteUserSchema), DeleteUserHandler)
Users.post('/setAdmin', MustLogined, MustBeAdmin, Validator(SetAdminSchema), SetAdminHandler)
Users.post('/removeAdmin', MustLogined, MustBeAdmin, Validator(RemoveAdminSchema), RemoveAdminHandler)

export default Users