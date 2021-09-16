import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailResultCotainer } from './change-email-result.container';

describe('ChangeEmailResultCotainer', () => {
  let component: ChangeEmailResultCotainer;
  let fixture: ComponentFixture<ChangeEmailResultCotainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailResultCotainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailResultCotainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
