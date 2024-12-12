import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../pigeon/entities/user';

@Injectable({
  providedIn: 'root'
})

export const DEFAULT_NAVIGATE_AFTER_LOGIN = '';
export const DEFAULT_NAVIGATE_AFTER_LOGOUT = '';

export class UserService {
  users: User[] = [
    new User("Jano", "jano@jano.sk", 1, true),
    new User("FeroFService", "fero@jano.sk", 2, false),
  ];

  constructor(private http: HttpClient,
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
}
