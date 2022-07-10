import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailCardComponent } from './member-detail-card.component';

describe('MemberDetailCardComponent', () => {
  let component: MemberDetailCardComponent;
  let fixture: ComponentFixture<MemberDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDetailCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
