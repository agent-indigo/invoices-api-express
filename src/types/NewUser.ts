import Credentials from '@/types/Credentials'
export default interface NewUser extends Credentials {
  confirmPassword: string
}