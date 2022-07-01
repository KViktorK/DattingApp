import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Datthing aplication';
  constructor(private _authService:AuthService){
  
  }
ngOnInit(){
  this._authService.autoLogin()
}
}
