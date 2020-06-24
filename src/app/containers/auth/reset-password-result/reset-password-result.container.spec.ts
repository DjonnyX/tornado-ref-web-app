import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordResultContainer } from './reset-password-result.container';

describe('ResetPasswordResultContainer', () => {
  let component: ResetPasswordResultContainer;
  let fixture: ComponentFixture<ResetPasswordResultContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordResultContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordResultContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
