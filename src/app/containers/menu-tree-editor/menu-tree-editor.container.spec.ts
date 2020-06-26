import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTreeEditorContainer } from './menu-tree-editor.container';

describe('MenuTreeEditorContainer', () => {
  let component: MenuTreeEditorContainer;
  let fixture: ComponentFixture<MenuTreeEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTreeEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTreeEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
