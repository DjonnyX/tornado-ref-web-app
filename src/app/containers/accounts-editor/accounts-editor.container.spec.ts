import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsEditorContainer } from './accounts-editor.container';

describe('AccountsEditorContainer', () => {
  let component: AccountsEditorContainer;
  let fixture: ComponentFixture<AccountsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
