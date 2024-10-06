import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import InvoiceModel from '../../models/InvoiceModel.js'
/**
 * @name    listInvoices
 * @desc    List all invoices
 * @route   GET /api/invoices
 * @access  private
 */
const listInvoices = catchRequestErrors(async (
  request,
  response
) => response.status(200).json(await InvoiceModel.findAll()))
export default listInvoices