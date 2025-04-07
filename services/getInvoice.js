import catchRequestErrors from '../middleware/catchRequestErrors.js'
import invoiceSqlModel from '../models/invoiceSqlModel.js'
/**
 * @name    getInvoice
 * @desc    Get a single invoice
 * @route   GET /invoices/:id
 * @access  private
 */
const getInvoice = catchRequestErrors(async (
  request,
  response
) => {
  const invoice = await invoiceSqlModel.findByPk(request.params.id)
  if (!invoice) {
    response.status(404)
    throw new Error('Invoice not found.')
  } else {
    response.status(200).json(invoice)
  }
})
export default getInvoice