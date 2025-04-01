import catchRequestErrors from '../middleware/catchRequestErrors.js'
import invoiceSqlModel from '../models/invoiceSqlModel.js'
/**
 * @name    addInvoice
 * @desc    Add a invoice
 * @route   POST /invoices
 * @access  private
 */
const addInvoice = catchRequestErrors(async (
  request,
  response
) => {
  const invoice = await request.json()
  for (const key in invoice) {
    if (!invoice[key]) {
      response.status(400)
      throw new Error(`Field "${key}" is empty.`)
    }
  }
  response.status(201).json(await invoiceSqlModel.create(invoice))
})
export default addInvoice