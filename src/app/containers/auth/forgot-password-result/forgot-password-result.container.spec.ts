import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordResultCotainer } from './forgot-password-result.container';

describe('ForgotPasswordResultCotainer', () => {
  let component: ForgotPasswordResultCotainer;
  let fixture: ComponentFixture<ForgotPasswordResultCotainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordResultCotainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordResultCotainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
