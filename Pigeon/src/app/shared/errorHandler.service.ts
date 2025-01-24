import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { MessageService } from "./message.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ErrorHandler {

messageService = inject(MessageService);
router = inject(Router);

errorHandling(err: any, message?: string):Observable<never> {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        this.messageService.errorToast("Server not accessible", 'X', 100000);
        return EMPTY;
      }
      if (err.status >= 400 && err.status < 500) {
        const msg = err.error.errorMessage || JSON.parse(err.error).errorMessage;
        if (msg === "unknown token") {
          localStorage.removeItem("Token");
          this.messageService.errorToast("Session lost, please log in again", 'X', 2000);
          this.router.navigateByUrl("/login");
          return EMPTY;
        }
        else {
          this.messageService.errorToast((message || "Missing a message"), 'X', 2000);
          return EMPTY;
        }
        
      }
      if (err.status >= 500)
        this.messageService.errorToast("Server error, see log for details", 'X', 2000);
    }
    return EMPTY;
  }
  
}