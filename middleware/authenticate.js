import 'dotenv/config'
import jwt from 'jsonwebtoken'
import catchRequestErrors from './catchRequestErrors.js'
import UserModel from '../models/UserModel.js'
const authenticate = catchRequestErrors(async (
  request,
  response,
  next
) => {
  const token = request.cookies.token || request.header('Authorization')?.substring(7)
  if (token) {
    const user = await UserModel.findByPk(jwt.verify(
      token,
      process.env.JWT_SECRET
    ).uuid)
    if (user) {
      request.uuid = user.uuid
      next()
    } else {
      response.status(401)
      throw new Error('User not found.')
    }
  } else {
    response.status(401)
    throw new Error('Token not found.')
  }
})
export default authenticate