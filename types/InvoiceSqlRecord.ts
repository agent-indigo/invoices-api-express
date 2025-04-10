import SqlRecord from '@/types/SqlRecord'
export default interface InvoiceSqlRecord extends SqlRecord {
  vendor: string
  subtotal: number
  hst: number
  total: number
  invoiceId: string
  date: Date
}