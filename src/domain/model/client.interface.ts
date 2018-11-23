export interface IClient {
  clientId: string
  name: string
  names: string[]
  kind: 'Person' | 'Company'
  clientRoles: { insured: boolean; applicant: boolean }
  createdAt: Date
  updatedAt: Date
}
