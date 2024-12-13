import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
/*import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PigeonComponent } from './Pigeon/pigeon';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'pigeon', component: PigeonComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: '/profile', pathMatch: 'full' } // Default route
];*/
export class NavbarComponent {

}
