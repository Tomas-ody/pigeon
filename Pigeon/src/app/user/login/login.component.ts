import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Auth } from '../../pigeon/entities/auth';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  
  auth: Auth = new Auth("admin","admin");
  usersService = inject(UserService);
  router = inject(Router);


  onSubmit() {
    //odoslať auth ako rest request
    this.usersService.login(this.auth).subscribe({
      next: success => {
        if (success) {
          // idem na autorizovanu sekciu
          this.router.navigateByUrl(this.usersService.navigateAfterLogin);
        } 
      }
    });
  }
}
