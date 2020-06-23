import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupContainer } from './signup.container';

describe('SignupContainer', () => {
  let component: SignupContainer;
  let fixture: ComponentFixture<SignupContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
