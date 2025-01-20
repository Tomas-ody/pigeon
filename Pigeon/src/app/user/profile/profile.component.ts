import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../pigeon/entities/user';
import { HttpClient } from '@angular/common/http';
import { PigeonService } from '../../pigeon/pigeon.service';
import { Pigeon } from '../../pigeon/entities/pigeon';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { subscribe } from 'diagnostics_channel';
import { MessageService } from '../../shared/message.service';

@Component({
  selector: 'app-profile',
  imports: [MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  showError = false;
  user?: User;
  userPigeons?: Pigeon[];

  constructor (
    private userService: UserService,
    private http: HttpClient,
    private pigeonService: PigeonService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status) => {
      if (!status) {
        console.log(status)
        this.user = undefined;
        this.userPigeons = undefined;
      } else {
        console.log(status)
        const token = localStorage.getItem("Token");
        this.userService.getUser().subscribe({
          next: (user: User) => {
            console.log("userService.getUser")
            this.user = user;
            this.showError = false;
          },
          error: err => {
            console.log("Chyba: ", err);
            this.showError = true;
          }
          
        });
        
        this.loadDataPigeons(token);
      }
    });
  }

  loadDataPigeons(token: any) {
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

  editPigeon(pigeon: Pigeon) {
    this.pigeonService.editPigeon(pigeon);
  }

  deletePigeon(pigeonId: number) {
    console.log("click")
    this.pigeonService.deletePigeon(pigeonId).subscribe(() => {
      this.loadDataPigeons(localStorage.getItem("Token"));
      this.messageService.successToast("Pigeon deleted successfully", "X", 2000);
    });
  }
}