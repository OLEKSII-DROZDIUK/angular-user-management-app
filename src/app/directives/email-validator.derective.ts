import { Directive, ElementRef, HostListener } from '@angular/core';
import { ValidationErrorHandlingService } from '@services/validation-error-handling.service';

@Directive({ selector: '[fieldEmailValidation]' })
export class EmailValidationDirective {
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
    let errorMessage: string | null = null;

    if (!value) {
      errorMessage = 'This field is required';
    } else if (value && !this.isValidEmail(value)) {
      errorMessage = 'Invalid email format';
    }

    this.errorHandl.setError(currentEl, errorMessage);
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
