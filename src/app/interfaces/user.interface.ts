import { UserType } from '../enums/user-type.enum';

export interface IUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: UserType;
  password: string;
  id: number;
}
