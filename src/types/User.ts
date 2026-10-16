import Credentials from '@/types/Credentials'
import SqlRecord from '@/types/SqlRecord'
export default interface User extends Credentials, SqlRecord {
  role: string
}