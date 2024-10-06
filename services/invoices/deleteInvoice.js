import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import InvoiceModel from '../../models/InvoiceModel.js'
/**
 * @name    deleteInvoice
 * @desc    Delete a invoice
 * @route   DELETE /api/invoices/:uuid
 * @access  private
 */
const deleteInvoice = catchRequestErrors(async (
  request,
  response
) => {
  const invoice = await InvoiceModel.findByPk(request.params.uuid)
  if (!invoice) {
    response.status(404)
    throw new Error('Invoice not found.')
  } else {
    await invoice.destroy()
    response.status(204).json({
      message: 'Invoice deleted.'
    })
  }
})
export default deleteInvoice