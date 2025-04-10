import {Router} from 'express'
import addInvoice from '@/services/addInvoice'
import deleteInvoice from '@/services/deleteInvoice'
import editinvoice from '@/services/editInvoice'
import listInvoices from '@/services/listInvoices'
import getInvoice from '@/services/getInvoice'
import authenticate from '@/middleware/authenticate'
import authorize from '@/middleware/authorize'
const invoicesRouter: Router = Router()
invoicesRouter.use(authenticate)
invoicesRouter.use(authorize(
  'root',
  'user'
))
invoicesRouter.get(
  '/',
  listInvoices
)
invoicesRouter.post(
  '/',
  addInvoice
)
invoicesRouter.get(
  '/:id',
  getInvoice
)
invoicesRouter.patch(
  '/:id',
  editinvoice
)
invoicesRouter.delete(
  '/:id',
  deleteInvoice
)
export default invoicesRouter