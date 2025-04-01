import catchRequestErrors from '../middleware/catchRequestErrors.js'
import invoiceSqlModel from '../models/invoiceSqlModel.js'
/**
 * @name    listInvoices
 * @desc    List all invoices
 * @route   GET /api/invoices
 * @access  private
 */
const listInvoices = catchRequestErrors(async (
  request,
  response
) => response.status(200).json(await invoiceSqlModel.findAll()))
export default listInvoices