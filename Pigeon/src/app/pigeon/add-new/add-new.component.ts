import { Component, inject } from '@angular/core';
import { Pigeon } from '../entities/pigeon';
import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { PigeonService } from '../pigeon.service';
import { AuthService } from '../../user/auth.service';
import { MessageService } from '../../shared/message.service';

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
  messageService = inject(MessageService);

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

  validateForm(): boolean {
    if (!this.pigeon.name || this.pigeon.name.length < 3) {
      return false; 
    }
    if (this.pigeon.fatherId < 0 || this.pigeon.motherId < 0) {
      return false; 
    }
    if(this.pigeon.id <0 || this.pigeon.id == null){
      return false;
    }
    //if (this.pigeon.fatherId && this.pigeon.motherId !== this.kidsId )
    //this.pigeonService.getPigeonsId
    return true; 
  }
  onSubmit(): void {
    if (!this.validateForm()) {
      this.messageService.errorToast(
        "Please fill in all required fields correctly.\n" +
        "No negative numbers.\n" +
        "Name has to be at least 3 letters.", "X",4000);
        return;
    }
      //this.messageService.errorToast;
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