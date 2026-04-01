import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserLogged } from '../_helper/userLogged';

export const authGuard: CanActivateFn = (route, state) => {
   const userLogged = new UserLogged();
  const router = inject(Router);

  

  if (userLogged.getCurrentUser().token) {
    return true;
  }

  router.navigate(['/start/login']);
  return false;

};