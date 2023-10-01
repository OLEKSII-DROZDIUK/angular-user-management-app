import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserApiService } from '@services/api/user.service';
import { GlobalLoaderService } from '@services/global-loader.service';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Injectable()
export class UserViewResolver {
  constructor(
    private router: Router,
    private userSrv: UserApiService,
    private loaderSrv: GlobalLoaderService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User | boolean> {
    const userId: number = Number(route.paramMap.get('id'));
    if (!userId) return of(this.redirectToHome());

    this.loaderSrv.showLoader();

    return this.userSrv.getOneByUsername(userId).pipe(
      take(1),
      map((user: User) => {
        this.loaderSrv.hideLoader();
        return !!user ? user : this.redirectToHome();
      }),
      catchError(() => of(this.redirectToHome()))
    );
  }
  private redirectToHome(): boolean {
    this.router.navigate(['']);
    return false;
  }
}
