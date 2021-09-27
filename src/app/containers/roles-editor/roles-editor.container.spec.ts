import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesEditorContainer } from './roles-editor.container';

describe('RolesEditorContainer', () => {
  let component: RolesEditorContainer;
  let fixture: ComponentFixture<RolesEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
