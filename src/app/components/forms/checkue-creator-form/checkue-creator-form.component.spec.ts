import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckueCreatorFormComponent } from './checkue-creator-form.component';

describe('CheckueCreatorFormComponent', () => {
  let component: CheckueCreatorFormComponent;
  let fixture: ComponentFixture<CheckueCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckueCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckueCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
