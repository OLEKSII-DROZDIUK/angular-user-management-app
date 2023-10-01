import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationErrorHandlingService {
  public setError(element: HTMLElement, message: string | null): void {
    element.classList[message ? 'add' : 'remove']('invalid');

    const parent = element.parentElement;
    const errorElement = parent?.querySelector('.form-group__error-message');

    if (errorElement) {
      errorElement.textContent = message;
    } else if (message) {
      const div = document.createElement('div');
      div.className = 'form-group__error-message';
      div.textContent = message;
      parent?.appendChild(div);
    }
  }
}
