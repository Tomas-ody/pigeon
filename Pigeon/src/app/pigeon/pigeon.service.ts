import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pigeon } from './entities/pigeon';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../shared/message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PigeonService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
) { }

  serverUrl = "http://localhost:8080/";

  getUserPigeons(token: any): Observable<Pigeon[]> {
    //const token = localStorage.getItem("umToken");
    const pigeons: Pigeon[] = [];

    if (token) {
      console.log("getUserPigeons token is");
      return this.http.get<{ data: Pigeon[]}>(this.serverUrl + "pigeons/owner", { headers: {Authorization: token}}).pipe(
        map(response => {
          
          response.data.forEach(jsonPigeon => {
            pigeons.push(Pigeon.clone(jsonPigeon)); // Manuálne pridávanie do poľa
          });
          return pigeons;
        })
      );
    }
    
    else {
      console.log("getUserPigeons token is not");
      return this.http.get<any[]>(this.serverUrl + "pigeons/owner");
    }
  }  


  getPigeons(token: any): Observable<Pigeon[]> {
    const pigeons: Pigeon[] = [];
    return this.http.get<{ data: Pigeon[]}>(this.serverUrl + "pigeons/list", { headers: {Authorization: token}}).pipe(
      map(response => {
          
        response.data.forEach(jsonPigeon => {
          pigeons.push(Pigeon.clone(jsonPigeon)); // Manuálne pridávanie do poľa
        });
        return pigeons;
      })
    )
    
  }
}
