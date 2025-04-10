import {Response} from 'express'
import jwt from 'jsonwebtoken'
const createToken: Function = (
  response: Response,
  id: string
): string => {
  const token = jwt.sign({
    id
  },
  process.env.JWT_SECRET ?? 'd3v3l0pm3nt53cr3tk3yn0t53cur3@t@11n3v3ru53!npr0duct!0n3v3r!!!', {
    expiresIn: '30d'
  })
  response.cookie(
    'token',
    token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  )
  return token
}
export default createToken