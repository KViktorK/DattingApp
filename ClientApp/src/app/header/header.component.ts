import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../service/AuthService';
import { User } from '../shared/interface/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private _userSub: Subscription;
  authenticated = false;
  
  dropdownValueChanged(e:Event){
  
  }
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this._userSub = this._authService.user.subscribe({
      next: (user: User) => {
        this.authenticated = !!user;
      },
    });
  }
  onRouter(route:string){
    this._router.navigate([`/${route}`])
  }
  onLogout() {
    this._authService.logout();
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }
}
