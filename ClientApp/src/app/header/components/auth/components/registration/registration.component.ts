import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/AuthService';
import { User } from 'src/app/shared/interface/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  loading: boolean = false;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _toastr: ToastrService
  ) {}
  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onRouter(route: string) {
    this._router.navigate([`/${route}`]);
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    let authObservable: Observable<User>;

    authObservable = this._authService.register(this.form.value);
    authObservable.subscribe({
      next: (v) => {
        const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigateByUrl(returnUrl);
      },
      error: ({ error }) => {
        this._toastr.error(error.message);
        this.loading = false;
      },
    });
    this.form.reset();
  }
}
