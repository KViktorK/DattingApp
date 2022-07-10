import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { IMember } from 'src/app/shared/interface/IMember';

@Component({
  selector: 'app-member-more-info',
  templateUrl: './member-more-info.component.html',
  styleUrls: ['./member-more-info.component.scss'],
})
export class MemberMoreInfoComponent implements OnInit {
  @Input() member: IMember;
  @Input() galleryOptions: NgxGalleryOptions[];
  @Input() galleryImages: NgxGalleryImage[];
  constructor() {}
  id: string = 'about';
  tabChange(id: string) {
    this.id = id;
  }
  ngOnInit(): void {}
}
