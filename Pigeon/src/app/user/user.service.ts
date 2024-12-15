import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { User } from '../pigeon/entities/user';
import { Auth } from '../pigeon/entities/auth';
import { NavbarComponent } from '../shared/navbar/navbar.component';

export const DEFAULT_NAVIGATE_AFTER_LOGIN = '/pigeon/list';
export const DEFAULT_NAVIGATE_AFTER_LOGOUT = '/users/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
) { }

  serverUrl = "http://localhost:8080/";
  //private loggedUserSubject = new BehaviorSubject(this.username);
  navigateAfterLogin = DEFAULT_NAVIGATE_AFTER_LOGIN;
  loggedIn: boolean = false;


    get token(): string {
      return localStorage.getItem('umToken') || '';
    }
  
  set token(value: string | null) {
    if (typeof window !== 'undefined' && localStorage) {
      if (value) {
        try {
          const parsedValue = JSON.parse(value); 
          if (parsedValue.token) {
            localStorage.setItem('umToken', parsedValue.token); 
          } else {
            console.error('Invalid token format');
          }
        } catch (e) {
          console.error('Error parsing token:', e);
        }
      } else {
        localStorage.removeItem('umToken'); 
      }
    }
  }
  getUser(): Observable<User> {
    const token = localStorage.getItem("umToken");

    if (!token) {
      this.messageService.errorToast("Missing token", 'X', 100000)
    }
    else {

      return this.http.get<any>(this.serverUrl + "users/me", { headers: {Authorization: token}}).pipe(
        map((jsonUser: any) => {
          console.log(jsonUser);
          return User.clone(jsonUser);
        }), 
        catchError(err => this.errorHandling(err))
      );
    }
    return this.http.get<any>(this.serverUrl + "users/me");
  }

  

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.serverUrl + "auth/login", auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        //this.username = auth.username;
        console.log("Bearer " + localStorage.getItem("umToken"));

        this.loggedIn = true;
        this.messageService.successToast("Login has been successful", 'X', 2000);
        return true;
      }),
      catchError(err => this.errorHandling(err))
    );
  }

  logout(): void {
    
      tap(() => {
        this.token = '';
        localStorage.removeItem("umToken");
        //this.username = ''; 
      }),
      catchError(err => this.errorHandling(err))
    
  }

  errorHandling(err: any):Observable<never> {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        this.messageService.errorToast("Server not accessible", 'X', 100000);
        return EMPTY;
      }
      if (err.status >= 400 && err.status < 500) {
        const msg = err.error.errorMessage || JSON.parse(err.error).errorMessage;
        if (msg === "unknown token") {
          this.token = '';
          //this.username = ''; 
          this.messageService.errorToast("Session lost, please log in again", 'X', 100000);
          this.router.navigateByUrl("/login");
          return EMPTY;
        }
        this.messageService.errorToast(msg, 'X', 100000);
        return EMPTY;
      }
      // status >= 500
      this.messageService.errorToast("Server error, see log for details", 'X', 100000);
    }
    console.error(err);
    return EMPTY;
  }
}
