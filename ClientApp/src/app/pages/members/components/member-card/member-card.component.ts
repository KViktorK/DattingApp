import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMember } from 'src/app/shared/interface/IMember';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: IMember;
  constructor(private _router: Router) {}
  onRouter(route: string) {
    console.log(route)
    this._router.navigate([`/members/${route}`]);
  }
  ngOnInit(): void {}
}
