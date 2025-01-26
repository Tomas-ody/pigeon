import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('Token');

  if (token) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + token),
    });
    return next(reqWithHeader);
  }

  return next(req);
};