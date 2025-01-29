import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../pigeon/entities/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor (
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  users?: User[];

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users
      }
    );
  }

  showOtherProfile(userId: number) {
    this.authService.setOwnProfile(false);
    this.router.navigate(['users/profile', userId]);
  }
}
