import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  Param,
  Authorized,
  QueryParams,
} from 'routing-controllers'
import { Response } from 'express'

import { ClientModel } from './../../../data/models/client.model'

@JsonController('/api/clients')
export class ClientController {
  // api/clients?kind=company&clientRoles=applicant
  @Get()
  async getAll(@QueryParams() params, @Res() res: Response) {
    try {
      let find = ClientModel.find()
      const { kind, clientRoles } = params

      if (kind) find = find.where('kind', RegExp(kind, 'i'))
      if (clientRoles) find = find.where(`clientRoles.${clientRoles.toLowerCase()}`, true)

      const clients = await find.exec()

      // SHOULD USE toJSON, toObject, res.json, otherwise PRODUCE rangeError
      // SHOULD USE 'return' res.json(clients)

      // TODO format Response
      return res.json(clients)
    } catch (error) {
      // TODO error handling
      console.log(error)
      throw error
    }
  }

  @Get('/:id')
  async GetOneBy(@Param('id') clientId: string, @Res() res: Response) {
    try {
      const client = await ClientModel.findOne({ clientId: clientId })

      return res.json(client)
    } catch (error) {
      // TODO error handling
      console.log(error)
      throw error
    }
  }

  @Post()
  async Post(@Body() client, @Res() res: Response) {
    try {
      // TODO class validator
      console.log('post')
      let newClient = new ClientModel({ ...client })
      newClient = await newClient.save()
      return res.status(201).json(newClient)
    } catch (error) {
      // TODO error handling
      console.log(error)
      throw error
    }
  }

  @Put('/:id')
  async Put(@Param('id') clientId: string, @Body() client, @Res() res: Response) {
    try {
      // TODO class validator to client
      const clientUpdated = await ClientModel.findOneAndUpdate(
        { clientId: clientId },
        client,
        { new: true }
      )
      if (!clientUpdated) return res.status(404).json({ message: 'not found' })
      return res.status(200).json(clientUpdated)
    } catch (error) {
      // TODO error handling
      console.log(error)
      throw error
    }
  }

  @Delete('/:id')
  async Delete(@Param('id') clientId: string, @Res() res: Response) {
    try {
      const clientDeleted = await ClientModel.findOneAndDelete({ clientId: clientId })
      if (!clientDeleted) return res.status(404).json({ message: 'not found' })
      return res.sendStatus(204)
    } catch (error) {
      // TODO error handling
      console.log(error)
      throw error
    }
  }
}
