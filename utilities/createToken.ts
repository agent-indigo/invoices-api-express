import {randomUUID} from 'crypto'
import {Response} from 'express'
import jwt from 'jsonwebtoken'
const createToken: Function = (
  response: Response,
  id: string
): string => {
  const token = jwt.sign({
    jti: randomUUID().toString(),
    iss: 'invoices.api',
    aud: 'invoices.client',
    sub: id,
    iat: Math.floor(Date.now() / 1000) - 30,
    nbf: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + 2592030
  },
    process.env.JWT_SECRET ?? 'd3v3l0pm3nt53cr3tk3yn0t53cur3@t@11n3v3ru53!npr0duct!0n3v3r!!!'
  )
  response.cookie(
    'token',
    token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 25920030,
    }
  )
  return token
}
export default createToken