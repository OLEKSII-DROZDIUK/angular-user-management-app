import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { NotificationType } from '../enums/notification-type.enum';
import { GlobalLoaderService } from '@services/global-loader.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notifSrv: NotificationService,
    private loaderSrv: GlobalLoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred';
        this.loaderSrv.hideLoader();

        if (error.body && error.body.error) {
          errorMessage = error.body.error;
        } else if (error.error) {
          errorMessage = error.error;
        }

        this.notifSrv.addNotification(errorMessage, NotificationType.Error);

        if (error.status === 403) {
          this.router.navigate(['403.html']);
        } else if (
          error.status === 404 &&
          error.message === 'Resource not found'
        ) {
          this.router.navigate(['404.html']);
        }
        return throwError(error);
      })
    );
  }
}
