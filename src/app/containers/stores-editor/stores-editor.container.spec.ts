import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresEditorContainer } from './stores-editor.container';

describe('StoresEditorContainer', () => {
  let component: StoresEditorContainer;
  let fixture: ComponentFixture<StoresEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
