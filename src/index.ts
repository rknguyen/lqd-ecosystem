import express from 'express'
import cors from 'cors'

import * as bodyParser from 'body-parser'

import { AccountsPassword } from '@accounts/password'
import { AccountsServer } from '@accounts/server'
import accountsExpress, { userLoader } from '@accounts/rest-express'

import db from './db'
import MongoDBInterface from '@accounts/mongo'

import SetupRoute from './routes'

const app : express.Application = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const accountsPassword = new AccountsPassword({
  validateNewUser: user => {
    return user;
  },
})

const accountsServer = new AccountsServer(
  {
    db: new MongoDBInterface(db.connection),
    tokenSecret: 'rknguyen',
  },
  {
    password: accountsPassword,
  }
)

app.use(accountsExpress(accountsServer))
app.use(userLoader(accountsServer))

// setting up routes
SetupRoute(app)

app.get('/user', userLoader(accountsServer), (req: express.Request, res: express.Response) => {
  res.json({ user: (req as any).user })
})

app.listen(4000, () => {
  console.log('Server listening on port 4000')
})