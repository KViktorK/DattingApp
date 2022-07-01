import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/interface/User';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://localhost:5000/api/';

  user = new BehaviorSubject<User>(null);

  constructor(private _http: HttpClient, private _router: Router) {}

  login(form: NgForm) {
    return this._http.post<User>(`${this.baseUrl}account/login`, form).pipe(
      tap((data: User) => {
        const user = new User(data.name, data.token);
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.user.next(user);
  }

  logout() {
    this.user.next(null);
    this._router.navigate(['/auth']);
    localStorage.removeItem('user');
  }
}
