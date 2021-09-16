import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetEmailResultContainer } from './reset-email-result.container';

describe('ResetEmailResultContainer', () => {
  let component: ResetEmailResultContainer;
  let fixture: ComponentFixture<ResetEmailResultContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetEmailResultContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetEmailResultContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
