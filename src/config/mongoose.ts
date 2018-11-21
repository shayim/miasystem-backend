import { connect } from 'mongoose'
import { get } from 'config'

export class Mongo {
  static start() {
    const uris = get<string>('mongo.uris')
    return connect(
      uris,
      { promiseLibrary: global.Promise, useNewUrlParser: true }
    )
      .then(mongoose => {
        console.log('SUCCESS: mongo conected SUCCESS')
      })
      .catch(error => {
        console.log('FAILURE: mongo connection FAILURE', error)
      })
  }
}
