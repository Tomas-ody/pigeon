import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { User } from '../pigeon/entities/user';

export const DEFAULT_NAVIGATE_AFTER_LOGIN = '';
export const DEFAULT_NAVIGATE_AFTER_LOGOUT = '';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [ 
    new User("Jano", "jano@jano.sk", 1, true),
    new User("FeroFService", "fero@jano.sk", 2, false),
  ];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
) { }

  serverUrl = "http://localhost:8080/";
  private loggedUserSubject = new BehaviorSubject(this.username);
  navigateAfterLogin = DEFAULT_NAVIGATE_AFTER_LOGIN;

  get token(): string {
    return localStorage.getItem('umToken') || '';
  }

  set token(value: string) {
    if (value) {
      localStorage.setItem('umToken', value);
    } else {
      localStorage.removeItem('umToken');
    }
  }

  get username(): string {
    return localStorage.getItem('umUsername') || '';
  }

  set username(value: string) {
    if (value) {
      localStorage.setItem('umUsername', value);
    } else {
      localStorage.removeItem('umUsername');
    }
    this.loggedUserSubject.next(value);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.serverUrl + "users/me").pipe(
      map((jsonUser: any) => {
        // Ak odpoveď obsahuje už objekt JSON, stačí ho priradiť k User
        return User.clone(jsonUser);  // Predpokladám, že `clone` je metóda, ktorá robí z jsonUser platný User objekt
      }), 
      catchError(err => this.errorHandling(err)) // Spracovanie chyby
    );
  }

  errorHandling(err: any):Observable<never> {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        this.messageService.error("Server not accessible");
        return EMPTY;
      }
      if (err.status >= 400 && err.status < 500) {
        const msg = err.error.errorMessage || JSON.parse(err.error).errorMessage;
        if (msg === "unknown token") {
          this.token = '';
          this.username = ''; 
          this.messageService.error("Session lost, please log in again");
          this.router.navigateByUrl("/login");
          return EMPTY;
        }
        this.messageService.error(msg);
        return EMPTY;
      }
      // status >= 500
      this.messageService.error("Server error, see log for details");
    }
    console.error(err);
    return EMPTY;
  }
}
