import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/notification/notification.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ForbiddenComponent } from '@pages/forbidden/forbidden.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@services/in-memory-data.service';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';

export function configureHttpClient() {
  return {
    throwErrors: true,
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NotFoundComponent,
    ForbiddenComponent,
    GlobalLoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 1000,
    }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
