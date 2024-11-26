import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import invoiceSqlModel from '../../models/invoiceSqlModel.js'
/**
 * @name    editInvoice
 * @desc    Edit a Invoice
 * @route   PUT /api/invoices/:id
 * @access  private
 */
const editinvoice = catchRequestErrors(async (
  request,
  response
) => {
  const invoice = await invoiceSqlModel.findByPk(request.params.id)
  if (!invoice) {
    response.status(404)
    throw new Error('Invoice not found.')
  } else {
    for (const key in request.body) {
      if (!request.body[key]) {
        response.status(400)
        throw new Error(`Field "${key}" is empty.`)
      }
    }
    await invoice.update(request.body)
    response.status(200).json(invoice)
  }
})
export default editinvoice