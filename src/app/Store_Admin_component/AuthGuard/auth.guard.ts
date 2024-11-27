import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return true; // Allow navigation
  } else {
    // Redirect to the login page
    const router = inject(Router);
    router.navigate(['']);
    return false; // Prevent navigation
  }
};
