import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMember } from '../shared/interface/IMember';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getMembers(): Observable<IMember[]> {
    return this._http.get<IMember[]>(`${this.baseUrl}Users`);
  }
  getMemberByUsername(username: string) {
    return this._http.get<IMember>(`${this.baseUrl}users/${username}`);
  }
}
