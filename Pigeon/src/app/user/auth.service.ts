import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSource = new BehaviorSubject<boolean>( false);
  loggedIn$ = this.loggedInSource.asObservable();

  constructor() { }

  setLoggedIn(value: boolean) {
    this.loggedInSource.next(value);
  }

  login(username: string, password: string): boolean {
    return username === "user1" && password === "user1";
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('Token');
  }

  logout(): void {
    localStorage.removeItem('Token');
  }
}
