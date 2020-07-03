import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorsEditorComponent } from './selectors-editor.component';

describe('SelectorsEditorComponent', () => {
  let component: SelectorsEditorComponent;
  let fixture: ComponentFixture<SelectorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
