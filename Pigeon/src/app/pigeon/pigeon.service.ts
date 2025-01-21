import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Pigeon } from './entities/pigeon';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../shared/message.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { EditComponent } from './edit/edit.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { response } from 'express';
import { UserService } from '../user/user.service';
import { User } from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class PigeonService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private dialog: MatDialog
) { }
  userService = inject(UserService);
  serverUrl = "http://localhost:8080/";

  

  getUserPigeons(token: any): Observable<Pigeon[]> {
    const pigeons: Pigeon[] = [];

    if (token) {
      console.log("getUserPigeons token is");
      return this.http.get<{ data: Pigeon[]}>(this.serverUrl + "pigeons/owner", { headers: {Authorization: token}}).pipe(
        map(response => {
          
          response.data.forEach(jsonPigeon => {
            pigeons.push(Pigeon.clone(jsonPigeon));
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

  getPigeon(id: number): Observable<Pigeon> {
    return this.http.get<Pigeon>(this.serverUrl + "pigeons/pigeon/" + id);
  }

  getPigeons(): Observable<Pigeon[]> {
    const pigeons: Pigeon[] = [];
    return this.http.get<{ data: Pigeon[]}>(this.serverUrl + "pigeons/list").pipe(
      mergeMap(response => {
        // Mapujeme všetky `ownerId` na observables na získanie používateľov
        const observables = response.data.map(jsonPigeon =>
          this.userService.getOtherUser(jsonPigeon.ownerId).pipe(
            map(user => {
              const tempPigeon = Pigeon.clone(jsonPigeon);
              tempPigeon.owner = User.clone(user); // Nastavenie vlastníka
              return tempPigeon;
            })
          )
        );
  
        // Použijeme forkJoin na získanie všetkých výsledkov naraz
        return forkJoin(observables);
      })
    );
  }

  getOtherUserPigeons(id: number): Observable<Pigeon[]> {
    const pigeons: Pigeon[] = [];
    return this.http.get<{data: Pigeon[]}>(this.serverUrl + "pigeons/owner/" + id).pipe(
      map(response => {
        response.data.forEach(jsonPigeon => {
          pigeons.push(Pigeon.clone(jsonPigeon));
        });
        return pigeons;
      })
    )
  }

  sendAddNewPigeon(pigeon: Pigeon, token: any): Observable<Pigeon> {
    console.log("sending data to server");
    return this.http.post<Pigeon>(this.serverUrl + "pigeons/add", pigeon, {headers : {Authorization: token}}).pipe(
      
      map(jsonPigeon => Pigeon.clone(jsonPigeon)),
      //catchError(err => this.errorHandling(err))
    );
  }

  updatePigeon(pigeon: Pigeon): Observable<boolean> {
    return this.http.post<boolean>(this.serverUrl + "pigeons/update", pigeon);
  }

  deletePigeon(pigeonId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.serverUrl + "pigeons/delete/" + pigeonId);
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

  editPigeon(pigeon: Pigeon) {
    let editWindow = this.dialog.open(EditComponent, {
      height: '400px',
      width: '600px',
      data: pigeon
    })
  };

  openFamilyTree(id: number) {
    this.router.navigateByUrl('/pigeon/family-tree/' + id);
  }
}
