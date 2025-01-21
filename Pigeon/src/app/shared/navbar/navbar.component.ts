import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { UserService } from '../../user/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule],
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
  permissions: boolean = false;

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status) => {
      this.loggedIn = status; 
    });
    this.authService.permissions$.subscribe((status) => {
      this.permissions = status;
    })
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/users/login");
  }

  profile() {
    this.authService.setOwnProfile(true);
  }
}
