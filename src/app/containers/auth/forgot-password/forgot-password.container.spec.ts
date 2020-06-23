import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordContainer } from './forgot-password.container';

describe('ForgotPasswordContainer', () => {
  let component: ForgotPasswordContainer;
  let fixture: ComponentFixture<ForgotPasswordContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
