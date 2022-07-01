import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interface/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: User[];

  constructor(private _http: HttpClient) {}

  getUsers() {
    this._http
      .get<User[]>('https://localhost:5000/api/Users')
      .subscribe((response: User[]) => {
        this.users = response;
      });
  }

  ngOnInit() {
    this.getUsers();
  }
}
