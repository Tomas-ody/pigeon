import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { UserService } from '../../user/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  
  constructor (
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}
  loggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status) => {
      this.loggedIn = status; 
    });

    if (localStorage.getItem("umToken") != null) {
      this.loggedIn = this.userService.loggedIn;
    }
    else {
      this.loggedIn = this.userService.loggedIn;
    };
  }

  logout() {
    this.userService.logout();
    this.loggedIn == this.userService.loggedIn;
    this.authService.setLoggedIn(false);
    this.router.navigateByUrl("/users/login");
  }
}
