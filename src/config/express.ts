import * as express from 'express'
import { useExpressServer } from 'routing-controllers'
import { controllers } from '../services/controllers'

export class Express {
  static app: express.Application

  static initialize() {
    if (!this.app) {
      this.app = express()
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))

      useExpressServer(this.app, {
        controllers: controllers,
      })

      this.app.get('/', (req, res) => res.end('hello'))
    }
    return this.app
  }
}
