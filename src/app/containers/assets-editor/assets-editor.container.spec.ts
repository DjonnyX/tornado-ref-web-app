import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsEditorContainer } from './assets-editor.container';

describe('AssetsEditorContainer', () => {
  let component: AssetsEditorContainer;
  let fixture: ComponentFixture<AssetsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
