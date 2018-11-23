import { model, Schema } from 'mongoose'
import { IClientDocument, IClientModel } from './client.interface'

export const ClientSchema = new Schema(
  {
    clientId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    names: { type: [String], index: true },
    kind: {
      type: String,
      enum: ['Person', 'Company'],
      required: true,
    },
    clientRoles: {
      insured: { type: Boolean },
      applicant: { type: Boolean },
    },
  },
  { timestamps: true }
)

export const ClientModel = model<IClientDocument, IClientModel>('Client', ClientSchema)

// ok(ClientModel.findPersonApplicants() instanceof Promise)
// equal(ClientModel.findPersonApplicants() instanceof Promise, false)  // true == false
