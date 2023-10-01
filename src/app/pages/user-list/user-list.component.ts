import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '@services/api/user.service';
import { Subscription, finalize } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public usersIsLoading: boolean = true;

  private userSubs: Subscription = new Subscription();

  constructor(private userSrv: UserApiService, private router: Router) {}

  public ngOnInit(): void {
    this.userSubs = this.userSrv
      .getAll()
      .pipe(finalize(() => (this.usersIsLoading = false)))
      .subscribe((users: User[]) => (this.users = users));
  }

  public ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  public onCreateUser(): void {
    this.router.navigate([`user-view`]);
  }

  public onUserClick(user: User): void {
    this.router.navigate([`user-view/${user.id}`]);
  }
}
