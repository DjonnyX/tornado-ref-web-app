import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetEmailContainer } from './reset-email.container';

describe('ResetEmailContainer', () => {
  let component: ResetEmailContainer;
  let fixture: ComponentFixture<ResetEmailContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetEmailContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetEmailContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
