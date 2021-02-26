import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckuesEditorComponent } from './checkues-editor.component';

describe('CheckuesEditorComponent', () => {
  let component: CheckuesEditorComponent;
  let fixture: ComponentFixture<CheckuesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckuesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckuesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
