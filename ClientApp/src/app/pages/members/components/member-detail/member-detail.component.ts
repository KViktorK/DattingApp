import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryImageSize,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { MembersService } from 'src/app/service/MembersService';
import { IMember } from 'src/app/shared/interface/IMember';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  member: IMember;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private _memberService: MembersService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
  }

  getImages(): NgxGalleryImage[]{
    const imageUrls=[];
    for(let photo of this.member.photos){
      imageUrls.push({
      small:photo?.url,
      medium:photo?.url,
      big:photo?.url
      })
    }
    return imageUrls
  }
  getMember() {
    this._memberService
      .getMemberByUsername(this._route.snapshot.paramMap.get('username'))
      .subscribe({
        next: (member) => {
          this.member = member;
          this.galleryImages= this.getImages();
          console.log(this.galleryImages)
        },
      });
  }
}
