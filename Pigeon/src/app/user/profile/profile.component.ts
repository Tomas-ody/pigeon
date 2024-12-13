import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../pigeon/entities/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  showError = false;
  user?: User;

  constructor (private userService: UserService,
    private http: HttpClient) { }
   

  

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.showError = false;
      },
      error: err => {
        console.log("Chyba: ", err);
        this.showError = true;
      }
    });
  }
}
