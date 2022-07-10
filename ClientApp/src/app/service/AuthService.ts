import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/interface/IUser';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;

  user = new BehaviorSubject<User>(null);

  constructor(private _http: HttpClient, private _router: Router) {}

  login(form: NgForm) {
    return this._http.post<User>(`${this.baseUrl}Auth/authenticate`, form).pipe(
      tap((data: User) => {
        const user = new User(data.username, data.token, data.firstName,data.lastName);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
        }
      })
    );
  }
  register(form: NgForm) {
    return this._http.post<User>(`${this.baseUrl}Auth/register`, form).pipe(
      tap((data: User) => {
        const user = new User(data.username, data.token, data.firstName,data.lastName);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
        }
      })
    );
  }
  
  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.user.next(user);
  }

  logout() {
    this.user.next(null);
    this._router.navigate(['/auth/login']);
    localStorage.removeItem('user');
  }
}
