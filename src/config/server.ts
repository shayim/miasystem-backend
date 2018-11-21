import { get } from 'config'

import { Express } from './express'

export class AppServer {
  static start() {
    const app = Express.initialize()
    const HOST = get<string>('express.host')
    const PORT = get<number>('express.port')

    app.listen(PORT, HOST, () => console.log(`listening at ${HOST}:${PORT}`))
  }
}
