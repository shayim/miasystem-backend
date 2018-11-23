// test mongoose for nested object

import * as express from 'express'
import { Mongo } from '../src/config/mongoose'
import { ClientModel } from '../src/data/models/client.model'

const app = express()
app.use(express.json())

app.get('/api/clients', async (req, res) => {
  const clients = await ClientModel.find()
  res.json(clients)
})

app.post('/api/clients', async (req, res) => {
  let client = await new ClientModel({ ...req.body }).save()
  res.json(client)
})

app.listen(7777, () => console.log('app is listening at Port 7777', app))
Mongo.start()
