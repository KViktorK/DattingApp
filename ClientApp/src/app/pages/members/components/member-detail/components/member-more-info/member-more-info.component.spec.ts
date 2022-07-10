import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMoreInfoComponent } from './member-more-info.component';

describe('MemberMoreInfoComponent', () => {
  let component: MemberMoreInfoComponent;
  let fixture: ComponentFixture<MemberMoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberMoreInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
