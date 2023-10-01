import { Directive, ElementRef, HostListener } from '@angular/core';
import { ValidationErrorHandlingService } from '@services/validation-error-handling.service';

@Directive({ selector: '[fieldRequired]' })
export class RequiredValidatorDirective {
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
    const errorMessage = !value ? 'This field is required' : null;

    this.errorHandl.setError(currentEl, errorMessage);
  }
}
