import { Component } from '@angular/core';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  constructor(private notifSrv: NotificationService) {}

  public get notifications() {
    return this.notifSrv.getNotifications();
  }
}
