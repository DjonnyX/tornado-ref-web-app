import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthErrorContainer } from './auth-error.container';

describe('AuthErrorContainer', () => {
  let component: AuthErrorContainer;
  let fixture: ComponentFixture<AuthErrorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthErrorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthErrorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
