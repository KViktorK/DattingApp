import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from '../service/AuthService';
import { User } from '../shared/interface/IUser';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: User;

    this._authService.user
      .pipe(take(1))
      .subscribe((user) => (currentUser = user));
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          authorization: `${currentUser.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
