import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LoginComponent,
    ProfileComponent,
    NavbarComponent,
    ListComponent
  ]
})
export class UserModule { }
