import catchRequestErrors from './catchRequestErrors.js'
import UserModel from '../models/UserModel.js'
const authorize = (...roles) => catchRequestErrors(async (
  request,
  response,
  next
) => {
  if (roles.includes((await UserModel.findByPk(request.id)).role)) {
    next()
  } else {
    response.status(401)
    throw new Error('Permission denied.')
  }
})
export default authorize