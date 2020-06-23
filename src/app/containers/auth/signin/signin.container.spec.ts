import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninContainer } from './signin.container';

describe('LoginComponent', () => {
  let component: SigninContainer;
  let fixture: ComponentFixture<SigninContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
