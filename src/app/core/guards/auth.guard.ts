import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth/state/auth-state.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn$.pipe(
    tap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate(['auth']);
      }
    })
  );
};
