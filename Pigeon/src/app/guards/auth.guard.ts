import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { MessageService } from '../shared/message.service';
import { AuthService } from '../user/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log("autGuard")
  const usersService = inject(UserService);
  const router = inject(Router);
  const messageService = inject(MessageService);
  const authService = inject(AuthService);
  const decision = authService.isLoggedIn();

  if (!decision) {
    console.log("authGuard, neprihlásený")
    usersService.navigateAfterLogin = state.url; // kam chcel ist
    router.navigateByUrl("/users/login");
    messageService.successToast("You need to log in first", "X", 2000);
  }
  return decision;
};
