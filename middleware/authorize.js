import catchRequestErrors from './catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
const authorize = (...roles) => catchRequestErrors(async (
  request,
  response,
  next
) => {
  let authorized = false
  const user = await userSqlModel.findByPk(request.id)
  if (user) {
    for (const role in roles) if (user.get('roles').includes(role)) authorized = true
    if (authorized) {
      next()
    } else {
      response.status(401)
      throw new Error('Permission denied.')
    }
  }
})
export default authorize