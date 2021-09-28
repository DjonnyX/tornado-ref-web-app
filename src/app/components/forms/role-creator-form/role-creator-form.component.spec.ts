import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCreatorFormComponent } from './role-creator-form.component';

describe('RoleCreatorFormComponent', () => {
  let component: RoleCreatorFormComponent;
  let fixture: ComponentFixture<RoleCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
