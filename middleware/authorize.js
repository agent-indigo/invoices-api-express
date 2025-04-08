import catchRequestErrors from './catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
const authorize = (...roles) => catchRequestErrors(async (
  request,
  response,
  next
) => {
  if (roles.includes((await userSqlModel.findByPk(request.id)).get('role'))) {
    next()
  } else {
    response.status(401)
    throw new Error('Permission denied.')
  }
})
export default authorize