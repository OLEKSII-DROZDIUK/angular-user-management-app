import { Directive, ElementRef, HostListener } from '@angular/core';
import { ValidationErrorHandlingService } from '@services/validation-error-handling.service';

@Directive({ selector: '[fieldPasswordValidation]' })
export class PasswordValidationDirective {
  constructor(
    private el: ElementRef,
    private errorHandl: ValidationErrorHandlingService
  ) {}

  @HostListener('blur') onBlur() {
    this.validate();
  }

  @HostListener('input') onInput() {
    this.validate();
  }

  private validate() {
    const currentEl = this.el.nativeElement;
    const value = currentEl.value;
    let errorMessage = !currentEl.value ? 'This field is required' : null;
    const hasMinimumLength = value && value.length >= 8;
    const hasNumberAndLetter = /^(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);

    if (!hasMinimumLength && !errorMessage) {
      errorMessage = 'Must be at least 8 characters long';
    }

    if (!hasNumberAndLetter && !errorMessage) {
      errorMessage = 'Must contain at least one number and one letter';
    }

    const repeatPasswordInput = document.querySelector(
      '[name="password_repeat"]'
    ) as HTMLInputElement;
    const passwordInput = document.querySelector(
      '[name="password"]'
    ) as HTMLInputElement;

    const passwordsIsMatch: boolean =
      repeatPasswordInput.value === passwordInput.value;

    this.errorHandl.setError(currentEl, errorMessage);

    if (!passwordsIsMatch) {
      this.errorHandl.setError(
        repeatPasswordInput,
        'Repeat password do not match'
      );
    } else if (passwordsIsMatch && passwordInput === currentEl) {
      this.errorHandl.setError(repeatPasswordInput, errorMessage);
    }
  }
}
