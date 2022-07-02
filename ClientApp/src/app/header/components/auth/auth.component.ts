import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }
  onCancel() {
    this._router.navigate(['/']);
  }
  authorization(form: NgForm) {
    if(!form.valid){
    
    }

    let authObservable: Observable<User>;
    if (this.loginMode) {
      authObservable = this._authService.login(form.value);
    } else {
      authObservable = this._authService.register(form.value);
    }
    authObservable.subscribe({
      next: (v) => {},
      error: ({ error }) => {
        
        this._toastr.error(error);
      },
    });
    form.reset();
  }

  ngOnInit(): void {
  
  }
}
