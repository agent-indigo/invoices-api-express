import asyncHandler from '../middleware/asyncHandler.js'
import invoiceModel from '../models/invoiceModel.js'
/**
 * @name    addInvoice
 * @desc    Add a invoice
 * @route   POST /api/invoices
 * @access  private
 */
export const addInvoice = asyncHandler(async (request, response) => {
  for (const key in request.body) {
    if (!request.body[key]) {
      response.status(400)
      throw new Error(`Field "${key}" is empty.`)
    }
  }
  response.status(201).json(await invoiceModel.create(request.body))
})
/**
 * @name    listInvoices
 * @desc    List all invoices
 * @route   GET /api/invoices
 * @access  private
 */
export const listInvoices = asyncHandler(async (
  request,
  response
) => response.status(200).json(await invoiceModel.findAll()))
/**
 * @name    editInvoice
 * @desc    Edit a Invoice
 * @route   PUT /api/invoices/:pk
 * @access  private
 */
export const editinvoice = asyncHandler(async (request, response) => {
  const invoice = await invoiceModel.findByPk(request.params.pk)
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
/**
 * @name    deleteInvoice
 * @desc    Delete a invoice
 * @route   DELETE /api/invoices/:pk
 * @access  private
 */
export const deleteInvoice = asyncHandler(async (request, response) => {
  const invoice = await invoiceModel.findByPk(request.params.pk)
  if (!invoice) {
    response.status(404)
    throw new Error('Invoice not found.')
  } else {
    await invoice.destroy()
    response.status(204).json({message: 'Invoice deleted.'})
  }
})