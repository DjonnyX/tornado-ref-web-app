import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreatorContainer } from './account-creator.container';

describe('AccountCreatorContainer', () => {
  let component: AccountCreatorContainer;
  let fixture: ComponentFixture<AccountCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
