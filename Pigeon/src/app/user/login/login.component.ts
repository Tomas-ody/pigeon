import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login() {
    const success = this.authService.login("user1", "user1");
    if (success) {
      console.log("Login successful");
    }
    else {
      console.log("Login failed");
    }
  }
}
