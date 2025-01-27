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
import { ErrorHandler } from '../shared/errorHandler.service';

@Injectable({
  providedIn: 'root'
})
export class PigeonService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private dialog: MatDialog,
    private errorHandler: ErrorHandler
) { }
  userService = inject(UserService);
  serverUrl = "http://localhost:8080/";

  

  getUserPigeons(token: any): Observable<Pigeon[]> {
    const pigeons: Pigeon[] = [];

    if (token) {
      console.log("getUserPigeons token is");
      return this.http.get<{ data: Pigeon[]}>(this.serverUrl + "pigeons/owner").pipe(
        map(response => {
          
          response.data.forEach(jsonPigeon => {
            pigeons.push(Pigeon.clone(jsonPigeon));
          });
          console.log(pigeons);
          return pigeons;
        }),
        catchError(err => this.errorHandler.errorHandling(err, "Couldn't get pigeons from the server."))
      );
    }
    
    else {
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

        const observables = response.data.map(jsonPigeon =>
          this.userService.getOtherUser(jsonPigeon.ownerId).pipe(
            map(user => {
              const tempPigeon = Pigeon.clone(jsonPigeon);
              tempPigeon.owner = User.clone(user); 
              return tempPigeon;
            })
          ),
          catchError(err => this.errorHandler.errorHandling(err, "Couldn't get pigeons from server"))
        );
        console.log(observables);
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
      }),
      catchError(err => this.errorHandler.errorHandling(err, "Couldn't get data of pigeons"))
    )
  }

  sendAddNewPigeon(pigeon: Pigeon, token: any): Observable<Pigeon> {
    return this.http.post<Pigeon>(this.serverUrl + "pigeons/add", pigeon/*, {headers : {Authorization: token}}*/).pipe(
      
      map(jsonPigeon => Pigeon.clone(jsonPigeon)),
      catchError(err => this.errorHandler.errorHandling(err, "Couldn't send data to a server."))
    );
  }

  updatePigeon(pigeon: Pigeon, token: any): Observable<boolean> {
    return this.http.post<boolean>(this.serverUrl + "pigeons/update", pigeon, {headers : {Authorization: token}} ).pipe(
      catchError(err => this.errorHandler.errorHandling(err, "Could't update a pigeon. Please try it again later."))
    );
  }

  deletePigeon(pigeonId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.serverUrl + "pigeons/delete/" + pigeonId);
  }

  

  editPigeon(pigeon: Pigeon) {
    this.dialog.open(EditComponent, {
      height: '400px',
      width: '600px',
      data: pigeon
    })
  };

  openFamilyTree(id: number) {
    this.router.navigateByUrl('/pigeon/family-tree/' + id);
  }
}
