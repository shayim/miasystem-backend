import { get } from 'config'
import * as jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import jwtAuthz = require('express-jwt-authz')

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
export const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: get<number>('auth0.jwksRequestsPerMinute'),
    jwksUri: get<string>('auth0.jwksUri'),
  }),
  // Validate the audience and the issuer.
  audience: get<string>('auth0.audience'),
  issuer: get<string>('auth0.issuer'),
  algorithms: ['RS256'],
})

export const checkScopes = jwtAuthz(['read:clients'])
