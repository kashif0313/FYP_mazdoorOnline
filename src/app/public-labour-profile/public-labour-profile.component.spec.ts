import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLabourProfileComponent } from './public-labour-profile.component';

describe('PublicLabourProfileComponent', () => {
  let component: PublicLabourProfileComponent;
  let fixture: ComponentFixture<PublicLabourProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLabourProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLabourProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
