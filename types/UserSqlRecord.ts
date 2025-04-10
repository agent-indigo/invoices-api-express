import SqlRecord from '@/types/SqlRecord'
export default interface UserSqlRecord extends SqlRecord {
  username: String
  password: String
  role: 'root' | 'user'
}