import bcrypt from 'bcryptjs'
import catchRequestErrors from '../middleware/catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
/**
 * @name    addUser
 * @desc    Add a new user
 * @route   POST /users
 * @access  private/root
 */
const addUser = catchRequestErrors(async (
  request,
  response
) => {
  const {
    username,
    password,
    confirmPassword
  } = await request.json()
  if (password !== confirmPassword) {
    response.status(400)
    throw new Error('Passwords do not match.')
  } else if (!username || !password || !confirmPassword) {
    response.status(400)
    throw new Error('At least one field is empty.')
  } else {
    await userSqlModel.create({
      username,
      password: await bcrypt.hash(
        password,
        12
      ),
      role: 'user'
    })
    response.status(201).json({
      message: `User created.`
    })
  }
})
export default addUser