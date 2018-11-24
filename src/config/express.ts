import * as express from 'express'
import { Action, useExpressServer } from 'routing-controllers'
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
        authorizationChecker: async (action: Action, roles: []) => {
          const token = (<express.Request>action.request).headers['authorization']

          // TODO check token validation
          if (token === '123') return true

          return false
        },
      })

      this.app.use(
        (
          error: any,
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          if (error) {
            // TODO logger
            console.log(`**** GLOBAL ERROR ****\n${error.message}`)
            if (!res.headersSent) return res.json({ errorMessage: error.message })
          }
        }
      )
    }
    return this.app
  }
}
