import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import invoiceSqlModel from '../../models/invoiceSqlModel.js'
/**
 * @name    addInvoice
 * @desc    Add a invoice
 * @route   POST /api/invoices
 * @access  private
 */
const addInvoice = catchRequestErrors(async (
  request,
  response
) => {
  for (const key in request.body) {
    if (!request.body[key]) {
      response.status(400)
      throw new Error(`Field "${key}" is empty.`)
    }
  }
  response.status(201).json(await invoiceSqlModel.create(request.body))
})
export default addInvoice