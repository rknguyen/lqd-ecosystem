import { Router } from 'express'
import Validator from '../../utils/validator'

import MustLogined from '../../middleware/authorize'
import MustBeAdmin from '../../middleware/admin'

const Announcement = Router()

import GetAnnouncementHandler from './get.handler'
import GetAnnouncementSchema from './get.schema'

import CreateAnnouncementHandler from './create.handler'
import CreateAnnouncementSchema from './create.schema'

import UpdateAnnouncementHandler from './update.handler'
import UpdateAnnouncementSchema from './update.schema'

import DeleteAnnouncementHandler from './delete.handler'
import DeleteAnnouncementSchema from './delete.schema'

// setting up document routes here
Announcement.get('/', MustLogined, Validator(GetAnnouncementSchema), GetAnnouncementHandler)
Announcement.post('/create', MustLogined, MustBeAdmin, Validator(CreateAnnouncementSchema), CreateAnnouncementHandler)
Announcement.post('/update', MustLogined, MustBeAdmin, Validator(UpdateAnnouncementSchema), UpdateAnnouncementHandler)
Announcement.post('/delete', MustLogined, MustBeAdmin, Validator(DeleteAnnouncementSchema), DeleteAnnouncementHandler)

export default Announcement