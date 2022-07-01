import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../service/AuthService';
import { User } from '../shared/interface/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private _userSub: Subscription;
  authenticated = false;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this._userSub = this._authService.user.subscribe({
      next: (user: User) => {
        this.authenticated = !!user;
      },
    });
  }
  onLogout() {
    this._authService.logout();
  }
  onAuth(){
  this._router.navigate(['/auth'])
  };
  ngOnDestroy() {
    this._userSub.unsubscribe();
  }
}
