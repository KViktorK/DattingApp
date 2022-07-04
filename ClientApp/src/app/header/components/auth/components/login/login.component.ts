import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/AuthService';
import { User } from 'src/app/shared/interface/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  submitted:boolean = false;

  
  get f() { return this.form.controls; }
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _toastr: ToastrService,
  ) {}
  
  onCancel() {
    this._router.navigate(['/']);
  }
  
  onRouter(route:string){
    this._router.navigate([`/${route}`])
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    let authObservable: Observable<User>;
    
    authObservable = this._authService.login(this.form.value);
    authObservable.subscribe({
      next: (v) => {
        const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigateByUrl(returnUrl);
      },
      error: ({ error }) => {
        console.log(error)
        this._toastr.error(error.message);
        this.loading = false;
      },
    });
    this.form.reset();
  }
  initForm(){
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.initForm()
  }
}
