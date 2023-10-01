import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { UserApiService } from '@services/api/user.service';
import { NotificationService } from '@services/notification.service';
import { Subscription, finalize } from 'rxjs';
import { NotificationType } from 'src/app/enums/notification-type.enum';
import { UserType } from 'src/app/enums/user-type.enum';
import { IUser } from 'src/app/interfaces/user.interface';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public viewMode: boolean = false;
  public currentUser: User = new User({} as IUser);
  public repeatPassword!: string;
  public fullName!: string;
  public UserType = UserType;
  private subsArray: Subscription[] = [];

  constructor(
    private userSrv: UserApiService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private notifSrv: NotificationService
  ) {}

  public ngOnInit(): void {
    this.subsArray.push(
      this.activeRoute.data.subscribe((data: Data) => {
        if (data['user']) {
          this.currentUser = data['user'];
          this.fullName =
            this.currentUser.first_name + ' ' + this.currentUser.last_name;
          this.viewMode = !!this.currentUser;
          this.repeatPassword = this.currentUser.password;
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subsArray.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }

  public onCreateUser(): void {
    if (this.currentUser.password != this.repeatPassword) {
      this.notifSrv.addNotification(
        'Both passwords must match.',
        NotificationType.Warning
      );
    } else {
      this.isLoading = true;
      this.subsArray.push(
        this.userSrv
          .createUser(this.currentUser)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe((user: User) => {
            this.notifSrv.addNotification(
              `The user ${user.username} was successfully created.`,
              NotificationType.Success
            );
            this.router.navigate(['user-list']);
          })
      );
    }
  }

  public onUpdateUser(): void {
    if (this.currentUser.password != this.repeatPassword) {
      this.notifSrv.addNotification(
        'Both passwords must match.',
        NotificationType.Warning
      );
    } else {
      this.isLoading = true;
      this.subsArray.push(
        this.userSrv
          .updateUser(this.currentUser)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe((result) => {
            this.notifSrv.addNotification(
              'The user was successfully updated.',
              NotificationType.Success
            );
            this.router.navigate(['user-list']);
          })
      );
    }
  }

  public onDeleteUser(): void {
    this.isLoading = true;
    this.subsArray.push(
      this.userSrv
        .deleteUser(this.currentUser.id)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((result) => {
          this.notifSrv.addNotification(
            `The ${this.currentUser.username} was successfully deleted.`,
            NotificationType.Success
          );
          this.router.navigate(['user-list']);
        })
    );
  }

  public onClickGoUserList(): void {
    this.router.navigate(['user-list']);
  }
}
