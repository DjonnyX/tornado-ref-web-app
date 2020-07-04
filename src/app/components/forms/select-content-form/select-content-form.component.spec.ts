import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContentFormComponent } from './select-content-form.component';

describe('SelectContentFormComponent', () => {
  let component: SelectContentFormComponent;
  let fixture: ComponentFixture<SelectContentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
