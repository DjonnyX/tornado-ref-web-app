import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsEditorContainer } from './ads-editor.container';

describe('AdsEditorContainer', () => {
  let component: AdsEditorContainer;
  let fixture: ComponentFixture<AdsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
