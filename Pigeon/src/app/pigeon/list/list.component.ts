import { Component, inject, OnInit } from '@angular/core';
import { PigeonService } from '../pigeon.service';
import { Pigeon } from '../entities/pigeon';
import { AuthService } from '../../user/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/message.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  constructor (

  ) { }

  pigeonService = inject(PigeonService);
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);
  showError = false;
  pigeons?: Pigeon[];

  ngOnInit(): void {
    this.loadDataAllPigeons();
  }

  loadDataAllPigeons() {
    this.pigeonService.getPigeons().subscribe({
      next: (pigeons: Pigeon[]) => {
        this.pigeons = pigeons;
        this.showError = false;
      },
      error: err => {
        this.showError = true;
      }
    });
  }

  goToFamilyTree(pigeon: Pigeon) {
    this.authService.loggedIn$.subscribe((status) => {
      if (status) {
        this.pigeonService.openFamilyTree(pigeon.id);
      }
      else {
        this.router.navigateByUrl("/users/login");
        this.messageService.successToast("You need to login first", "X", 2000);
      }
    })
    }

  goToProfile(id: number) {
    this.authService.setOwnProfile(false);
    this.router.navigate(['users/profile', id]);
  }
}
