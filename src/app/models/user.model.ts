import { UserType } from '../enums/user-type.enum';
import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  public username: string = '';
  public first_name: string = '';
  public last_name: string = '';
  public email: string = '';
  public user_type: UserType = UserType.Driver;
  public password: string;
  public id: number;

  constructor(data: IUser) {
    this.username = data.username || '';
    this.first_name = data.first_name || '';
    this.last_name = data.last_name || '';
    this.email = data.email || '';
    this.user_type = data.user_type || UserType.Driver;
    this.password = data.password;
    this.id = data.id || 1;
  }
}
