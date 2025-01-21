import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSource = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSource.asObservable();
  private permissionsSource = new BehaviorSubject<boolean>(false);
  permissions$ = this.permissionsSource.asObservable();
  private ownProfile = new BehaviorSubject<boolean>(false);
  ownProfile$ = this.ownProfile.asObservable();

  constructor() { }

  setOwnProfile(value: boolean) {
    this.ownProfile.next(value);
  }

  setPermissions(value: boolean) {
    this.permissionsSource.next(value);
  }

  setLoggedIn(value: boolean) {
    this.loggedInSource.next(value);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('Token');
  }
}  

  