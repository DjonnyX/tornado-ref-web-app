import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupNodeContentDialogComponent } from './setup-node-content-dialog.component';

describe('SetupNodeContentDialogComponent', () => {
  let component: SetupNodeContentDialogComponent;
  let fixture: ComponentFixture<SetupNodeContentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupNodeContentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupNodeContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
