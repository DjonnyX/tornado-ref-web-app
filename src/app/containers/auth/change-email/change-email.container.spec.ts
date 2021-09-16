import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailContainer } from './change-email.container';

describe('ChangeEmailContainer', () => {
  let component: ChangeEmailContainer;
  let fixture: ComponentFixture<ChangeEmailContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
