import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view.component';
import { RouterModule } from '@angular/router';
import { UserViewResolver } from './user-view.resolver';
import { FormsModule } from '@angular/forms';
import { RequiredValidatorDirective } from 'src/app/directives/requeired-validator.derective';
import { PasswordValidationDirective } from 'src/app/directives/password-validator.derective';
import { EmailValidationDirective } from 'src/app/directives/email-validator.derective';

@NgModule({
  declarations: [
    UserViewComponent,
    RequiredValidatorDirective,
    PasswordValidationDirective,
    EmailValidationDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserViewComponent,
      },
      {
        path: ':id',
        component: UserViewComponent,
        resolve: { user: UserViewResolver },
      },
    ]),
    FormsModule,
  ],
  providers: [UserViewResolver],
})
export class UserViewModule {}
