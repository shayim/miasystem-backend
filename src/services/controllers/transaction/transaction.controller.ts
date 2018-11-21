import { JsonController, Get } from 'routing-controllers'

import { ITransaction } from './models/transaction.interface'

@JsonController('/api/transactions')
export class TransactionController {
  @Get('')
  async GetAll(): Promise<ITransaction[]> {
    var transList: ITransaction[] = [{ id: '1' }, { id: '2' }]
    return Promise.resolve(transList)
  }
}
