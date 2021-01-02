import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsEditorComponent } from './applications-editor.component';

describe('ApplicationsEditorComponent', () => {
  let component: ApplicationsEditorComponent;
  let fixture: ComponentFixture<ApplicationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
