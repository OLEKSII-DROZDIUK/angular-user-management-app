import { Injectable } from '@angular/core';
import { NotificationType } from '../enums/notification-type.enum';
import { INotification } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: INotification[] = [];
  private readonly displayDuration = 3000;

  public addNotification(message: string, type: NotificationType) {
    this.notifications.push({ message, type });
    setTimeout(() => this.removeNotification(), this.displayDuration);
  }

  public getNotifications() {
    return this.notifications;
  }

  public removeNotification() {
    this.notifications.shift();
  }
}
