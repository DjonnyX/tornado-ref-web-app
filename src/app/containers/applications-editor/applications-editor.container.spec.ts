import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsEditorContainer } from './applications-editor.container';

describe('ApplicationsEditorContainer', () => {
  let component: ApplicationsEditorContainer;
  let fixture: ComponentFixture<ApplicationsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
