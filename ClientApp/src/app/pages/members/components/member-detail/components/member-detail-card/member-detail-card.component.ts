import { Component, Input, OnInit } from '@angular/core';
import { IMember } from 'src/app/shared/interface/IMember';

@Component({
  selector: 'app-member-detail-card',
  templateUrl: './member-detail-card.component.html',
  styleUrls: ['./member-detail-card.component.scss']
})
export class MemberDetailCardComponent implements OnInit {
  @Input()member:IMember;
  constructor() { }

  ngOnInit(): void {
  }

}
