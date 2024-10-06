import 'dotenv/config'
import jwt from 'jsonwebtoken'
const createToken = (
  response,
  uuid
) => {
  const token = jwt.sign({
    uuid
  },
  process.env.JWT_SECRET, {
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