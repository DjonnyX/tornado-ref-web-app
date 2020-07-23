import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScenarioDialogComponent } from './edit-scenario-dialog.component';

describe('EditScenarioDialogComponent', () => {
  let component: EditScenarioDialogComponent;
  let fixture: ComponentFixture<EditScenarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScenarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScenarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
