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
    usersService.navigateAfterLogin = state.url;
    router.navigateByUrl("/users/login");
    messageService.successToast("You need to login first", "X", 2000);
  }
  return decision;
};
