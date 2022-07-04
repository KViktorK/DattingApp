import {
    CanActivate,
    Router,
    UrlTree
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map,take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/AuthService';
import { ToastrService } from 'ngx-toastr';
  
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    constructor(
      private _authService: AuthService,
       private _router: Router,
       private _toastr:ToastrService) {}
  
    canActivate(
    ):
      | boolean
      | Promise<boolean >
      | Observable<boolean | UrlTree> {
      return this._authService.user.pipe(
        take(1),
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }else{
          this._toastr.error("You shall not pass!")
          }
          return this._router.createUrlTree(['/auth/login']);
        })
      );
    }
  }
  