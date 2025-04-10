import Credentials from '@/types/Credentials'
import SqlRecord from '@/types/SqlRecord'
export default interface UserSqlRecord extends Credentials, SqlRecord {
  role: 'root' | 'user'
}