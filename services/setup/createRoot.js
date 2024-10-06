import bcrypt from 'bcryptjs'
import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import UserModel from '../../models/UserModel.js'
/**
 * @name    createRoot
 * @desc    Create the root user
 * @route   POST /api/setup/root
 * @access  public
 */
const createRoot = catchRequestErrors(async (
  request,
  response
) => {
  const {
    password,
    confirmPassword
  } = request.body
  if (await UserModel.findOne({
    where: {
      role: 'root'
    }
  })) {
    response.status(403)
    throw new Error('Root user already exists.')
  } else {
    if (password !== confirmPassword) {
      response.status(403)
      throw new Error('Passwords do not match')
    } else if (!password || !confirmPassword) {
      response.status(403)
      throw new Error('At least one field is empty')
    } else {
      await UserModel.create({
        name: 'root',
        shadow: await bcrypt.hash(
          password,
          10
        ),
        role: 'root'
      })
      response.status(201).json({
        message: 'User "root" created.'
      })
    }
  }
})
export default createRoot