import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifsEditorContainer } from './tarifs-editor.container';

describe('TarifsEditorContainer', () => {
  let component: TarifsEditorContainer;
  let fixture: ComponentFixture<TarifsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
