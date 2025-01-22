import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../pigeon/entities/user';
import { HttpClient } from '@angular/common/http';
import { PigeonService } from '../../pigeon/pigeon.service';
import { Pigeon } from '../../pigeon/entities/pigeon';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { subscribe } from 'diagnostics_channel';
import { MessageService } from '../../shared/message.service';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';

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
  ownProfile: boolean = false;

  constructor (
    private userService: UserService,
    private http: HttpClient,
    private pigeonService: PigeonService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private dialog: MatDialog
  ) { }

  route = inject(ActivatedRoute);

  ngOnInit(): void {

    this.authService.loggedIn$.subscribe((status) => {
      if (!status) {
        console.log(status)
        this.user = undefined;
        this.userPigeons = undefined;
      } 
      else {
        this.authService.ownProfile$.subscribe((status) => {
          this.ownProfile = status;
        })

        

        console.log(status)
        const token = localStorage.getItem("Token");
        if (this.route.snapshot.paramMap.get('id')) {
          this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            console.log("INY POUŽIVATEĽ")
            this.loadDataOtherUser(id);
            this.loadDataPigeonsOtherUser(id);
            
          })
        }
        else {
          this.loadDataUser();
          this.loadDataPigeons(token);
        }

        
      }
    });
  }

  loadDataOtherUser(id: number) {
    this.userService.getOtherUser(id).subscribe({
      next: (user: User) => {
        this.user = user;
      }
    })
  }

  loadDataPigeonsOtherUser(id: number) {
    this.pigeonService.getOtherUserPigeons(id).subscribe({
      next: (pigeons: Pigeon[]) => {
        this.userPigeons = pigeons;
      }
    })
  }

  loadDataUser() {
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.user = User.clone(user);
        this.authService.setUserEmail(this.user.email);
        this.showError = false;
      },
      error: err => {
        console.log("Chyba: ", err);
        this.showError = true;
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
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this Pigeon?'
      }
    });

    
    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pigeonService.deletePigeon(pigeonId).subscribe(() => {
          this.loadDataPigeons(localStorage.getItem("Token"));
          this.messageService.successToast("Pigeon deleted successfully", "X", 2000);
        });
      }
    });
  }

  goToFamilyTree(pigeon: Pigeon) {
    this.pigeonService.openFamilyTree(pigeon.id);
  }
}