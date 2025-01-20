import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { User } from '../pigeon/entities/user';
import { Auth } from '../pigeon/entities/auth';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthService } from './auth.service';

export const DEFAULT_NAVIGATE_AFTER_LOGIN = '/users/profile';
export const DEFAULT_NAVIGATE_AFTER_LOGOUT = '/users/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
) { }

  serverUrl = "http://localhost:8080/";
  navigateAfterLogin = DEFAULT_NAVIGATE_AFTER_LOGIN;


    get token(): string {
      return localStorage.getItem('Token') || '';
    }
  
  set token(value: string | null) {
    if (typeof window !== 'undefined' && localStorage) {
      if (value) {
        try {
          const parsedValue = JSON.parse(value); 
          if (parsedValue.token) {
            localStorage.setItem('Token', parsedValue.token); 
          } else {
            console.error('Invalid token format');
          }
        } catch (e) {
          console.error('Error parsing token:', e);
        }
      } else {
        localStorage.removeItem('Token'); 
      }
    }
  }

  getOtherUser(id: number): Observable<User> {
    return this.http.get<User>(this.serverUrl + "users/user/" + id).pipe(
      map((jsonUser: User) => {
        const user = User.clone(jsonUser);
        return user;
      })
    )
  }

  getUser(): Observable<User> {
    const token = localStorage.getItem("Token");

    if (!token) {
      this.messageService.errorToast("Missing token", 'X', 100000)
    }
    else {

      return this.http.get<any>(this.serverUrl + "users/me", { headers: {Authorization: token}}).pipe(
        map((jsonUser: any) => {
          console.log(jsonUser);
          const user = User.clone(jsonUser);
          if (user.role == "ROLE_ADMIN") {
            this.authService.setPermissions(true);
          }
          return user;
        }), 
        catchError(err => this.errorHandling(err))
      );
    }
    return this.http.get<any>(this.serverUrl + "users/me");
  }

  getUsers(token: any): Observable<User[]> {
    const users: User[] = [];
    return this.http.get<{data: User[]}>(this.serverUrl + "users/all", { headers: {Authorization: token}}).pipe(
          map(response => {
              
            response.data.forEach(jsonUser => {
              users.push(User.clone(jsonUser));
            });
            return users;
          })
        ) 
  };

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.serverUrl + "auth/login", auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        console.log("Bearer " + localStorage.getItem("Token"));

       
        this.messageService.successToast("Login has been successful", 'X', 2000);
        return true;
      }),
      catchError(err => this.errorHandling(err))
    );
  }

  logout(): void {
    localStorage.removeItem("Token");
    this.authService.setLoggedIn(false);
    this.authService.setPermissions(false);
    this.token = "";
    
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
