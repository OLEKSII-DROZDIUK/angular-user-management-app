import { NotificationType } from '../enums/notification-type.enum';

export interface INotification {
  message: string;
  type: NotificationType;
}
