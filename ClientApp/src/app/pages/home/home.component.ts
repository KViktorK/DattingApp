import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interface/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user:User
  
  constructor(private _router: Router) {}
  
  
  onAuth() {
    this._router.navigate(['/auth']);
  }
  ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('user'))
  
}
}
