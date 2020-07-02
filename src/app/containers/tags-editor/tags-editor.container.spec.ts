import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsEditorContainer } from './tags-editor.container';

describe('TagsEditorContainer', () => {
  let component: TagsEditorContainer;
  let fixture: ComponentFixture<TagsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
