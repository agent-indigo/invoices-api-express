import catchRequestErrors from '../middleware/catchRequestErrors.js'
import invoiceSqlModel from '../models/invoiceSqlModel.js'
/**
 * @name    deleteInvoice
 * @desc    Delete a invoice
 * @route   DELETE /invoices/:id
 * @access  private
 */
const deleteInvoice = catchRequestErrors(async (
  request,
  response
) => {
  const invoice = await invoiceSqlModel.findByPk(request.params.id)
  if (!invoice) {
    response.status(404)
    throw new Error('Invoice not found.')
  } else {
    await invoice.destroy()
    response.status(204)
  }
})
export default deleteInvoice