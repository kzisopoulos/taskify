import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.checkAuth().pipe(
    tap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate(['auth']);
      }
    })
  );
};
