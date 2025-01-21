import { Component, inject, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Auth } from '../../pigeon/entities/auth';


@Component({
  selector: 'app-login',
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  
  auth: Auth = new Auth("admin","admin");
  usersService = inject(UserService);
  router = inject(Router);


  onSubmit() {
    this.usersService.login(this.auth).subscribe({
      next: success => {
        if (success) {
          this.authService.setLoggedIn(true);
          this.authService.setOwnProfile(true);
          this.router.navigateByUrl(this.usersService.navigateAfterLogin);
        } 
      }
    });
  }
}
