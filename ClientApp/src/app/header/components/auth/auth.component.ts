import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/AuthService';
import { User } from 'src/app/shared/interface/User';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginMode: boolean = true;

  constructor(
    private _authService: AuthService, 
    private _router: Router)
     {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  authorization(form: NgForm) {
    if (!form.valid) {
      return console.log('Error');
    }
    let authObservable: Observable<User>;
    if (this.loginMode) {
      authObservable = this._authService.login(form.value)
    }
    authObservable.subscribe({
      next: (v) => {
        this._router.navigate(['/list']);
      },
    });
    form.reset();
  }

  ngOnInit(): void {
    
  }
}
