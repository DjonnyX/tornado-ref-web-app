import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresEditorComponent } from './stores-editor.component';

describe('StoresEditorComponent', () => {
  let component: StoresEditorComponent;
  let fixture: ComponentFixture<StoresEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
