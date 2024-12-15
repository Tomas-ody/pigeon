import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { User } from '../pigeon/entities/user';
import { Auth } from '../pigeon/entities/auth';

export const DEFAULT_NAVIGATE_AFTER_LOGIN = '';
export const DEFAULT_NAVIGATE_AFTER_LOGOUT = '';

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
/*
  get token(): string {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('umToken') || '';
    }
    return ''; // Predvolené, keď nie je dostupné localStorage
  }*/

    get token(): string {
      return localStorage.getItem('umToken') || '';
    }
  
  set token(value: string | null) {
    if (typeof window !== 'undefined' && localStorage) {
      if (value) {
        try {
          const parsedValue = JSON.parse(value); // Parsuje JSON reťazec na objekt
          if (parsedValue.token) {
            localStorage.setItem('umToken', parsedValue.token); // Uloží iba hodnotu tokenu
          } else {
            console.error('Invalid token format');
          }
        } catch (e) {
          console.error('Error parsing token:', e);
        }
      } else {
        localStorage.removeItem('umToken'); // Odstráni token z localStorage
      }
    }
  }
/*
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
*/
  getUser(): Observable<User> {
    const token = localStorage.getItem("umToken");

    if (!token) {
      this.messageService.errorToast("Missing token", 'X', 100000)
    }
    else {

      return this.http.get<any>(this.serverUrl + "users/me", { headers: {Authorization: token}}).pipe(
        map((jsonUser: any) => {
          this.messageService.successToast("Login has been successful");
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
        //localStorage.setItem("umToken", token)
        this.token = token;
        //this.username = auth.username;
        console.log("Bearer " + localStorage.getItem("umToken"));
        
        this.messageService.successToast(token || "Nie je token", 'X', 100000);
        return true;
      }),
      catchError(err => this.errorHandling(err))
    );
  }

  logout(): void {
    
      tap(() => {
        this.token = '';
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
