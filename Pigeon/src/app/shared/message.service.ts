import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private msgSubject = new Subject<Message>();

  constructor() { }

  success(message: string) {
    this.msgSubject.next({value:message, type: 'success'});
  }

  error(message: string) {
    this.msgSubject.next({value:message, type: 'error'});
  }

  getMessageStream(): Observable<Message> {
    return this.msgSubject.asObservable();
  }
}

export interface Message {
  value: string,
  type: 'success'|'error';
}