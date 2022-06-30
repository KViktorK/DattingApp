import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './shared/interface/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'Datthing aplication';
  users: User[];

  constructor(private _http: HttpClient) {}

  getUsers(){
    this._http.get<User[]>('https://localhost:5000/api/Users').subscribe(
    (response: User[]) => {
      this.users = response;
    },
  );
  }

  ngOnInit() {
   this.getUsers()
  }
}
