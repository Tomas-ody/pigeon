import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../pigeon/entities/user';
import { HttpClient } from '@angular/common/http';
import { PigeonService } from '../../pigeon/pigeon.service';
import { Pigeon } from '../../pigeon/entities/pigeon';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  showError = false;
  user?: User;
  userPigeons?: Pigeon[];

  constructor (
    //private userService: UserService,
    private http: HttpClient,
    //private pigeonService: PigeonService
  ) { }
   
  userService = inject(UserService);
  pigeonService = inject(PigeonService);

  ngOnInit(): void {
    const token = localStorage.getItem("umToken");
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
    this.pigeonService.getUserPigeons(token).subscribe({
      next: (pigeons: Pigeon[]) => {
        this.userPigeons = pigeons;
        console.log(pigeons);
        this.showError = false;
      },
      error: err => {
        console.log("Chyba: ", err);
        this.showError = true;
      }
    });
  }
}