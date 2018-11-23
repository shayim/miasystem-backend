import { Model, Document } from 'mongoose'

import { IClient } from '../../domain/model/client.interface'

export interface IClientDocument extends IClient, Document {}

export interface IClientModel extends Model<IClientDocument> {}
