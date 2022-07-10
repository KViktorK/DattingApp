import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/service/MembersService';
import { IMember } from 'src/app/shared/interface/IMember';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members: IMember[];
  constructor(private _memberService: MembersService) {}

  getMembers() {
    this._memberService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }

  ngOnInit(): void {
  this.getMembers();
  }
}
