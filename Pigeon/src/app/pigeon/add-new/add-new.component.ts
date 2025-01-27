import { Component, inject } from '@angular/core';
import { Pigeon } from '../entities/pigeon';
import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { PigeonService } from '../pigeon.service';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-add-new',
  imports: [MaterialModule],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css'
})
export class AddNewComponent {

  router = inject(Router);
  pigeonService = inject(PigeonService);
  auth = inject(AuthService);

  pigeon: Pigeon = new Pigeon(0,0,0,[],"","","",0);

  kidsIdString: string = '';

  get kidsId(): number[] {
    return this.kidsIdString
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10))
      .filter((id: number) => !isNaN(id));
  }

  set kidsId(value: number[]) {
    this.kidsIdString = value.join(',');
  }

  onSubmit(): void {
      this.pigeon.kidsId = this.kidsId;
      const token = localStorage.getItem("Token");
      this.pigeonService.sendAddNewPigeon(this.pigeon, token).subscribe({
        next: success => {
          if (success) {
            console.log("add pigeon");
            this.auth.setLoggedIn(true);
            this.router.navigateByUrl("/users/profile");
          } 
        }
  });
      
    }

    goBack() {
      this.auth.setLoggedIn(true);
      this.auth.setOwnProfile(true);
      //this.router.navigateByUrl("/users/profile");
    }
  }