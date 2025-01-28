import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { User } from '../pigeon/entities/user';
import { Auth } from '../pigeon/entities/auth';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthService } from './auth.service';
import { ErrorHandler } from '../shared/errorHandler.service';

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
    private authService: AuthService,
    private errorHandler: ErrorHandler
) { }

  serverUrl = "http://localhost:8080/";
  navigateAfterLogin = DEFAULT_NAVIGATE_AFTER_LOGIN;


    get token(): string {
      return localStorage.getItem('Token') || '';
    }


  set token(value: string | null) {
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

  getOtherUser(id: number): Observable<User> {
    return this.http.get<User>(this.serverUrl + "users/user/" + id).pipe(
      map((jsonUser: User) => {
        const user = User.clone(jsonUser);
        return user;
      }),
      catchError(err => this.errorHandler.errorHandling(err, "Couldn't find the data of user."))
    )
  }

  getUser(): Observable<User> {
    const token = localStorage.getItem("Token");

    if (!token) {
      this.messageService.errorToast("Missing token", 'X', 2000)
    }
    else {

      return this.http.get<any>(this.serverUrl + "users/me"/*, { headers: {Authorization: token}}*/).pipe(
        map((jsonUser: any) => {
          console.log(jsonUser);
          const user = User.clone(jsonUser);
          if (user.role == "ROLE_ADMIN") {
            this.authService.setPermissions(true);
          }
          return user;
        }), 
        catchError(err => this.errorHandler.errorHandling(err, "We have technicall issues."))
      );
    }
    return this.http.get<any>(this.serverUrl + "users/me");
  }

  getUsers(token: any): Observable<User[]> {
    const users: User[] = [];
    return this.http.get<{data: User[]}>(this.serverUrl + "users/all"/*, { headers: {Authorization: token}}*/).pipe(
          map(response => {
              
            response.data.forEach(jsonUser => {
              users.push(User.clone(jsonUser));
            });
            return users;
          }),
          catchError(err => this.errorHandler.errorHandling(err, "Couldn't get all users."))
        );
  };

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.serverUrl + "auth/login", auth, {responseType: 'text'}).pipe(
      map(response => {
        this.token = response;
       
        this.messageService.successToast("Login has been successful", 'X', 2000);
        return true;
      }),
      catchError(err => this.errorHandler.errorHandling(err, "Invalid credentials"))
    );
  }

  logout(): void {
    localStorage.removeItem("Token");
    this.authService.setLoggedIn(false);
    this.authService.setPermissions(false);
    this.token = "";
    this.authService.setUserEmail("");
  }
}
