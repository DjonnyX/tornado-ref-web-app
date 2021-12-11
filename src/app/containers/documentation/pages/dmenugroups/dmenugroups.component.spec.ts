import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMenuGroupsComponent } from './dmenugroups.component';

describe('DMenuGroupsComponent', () => {
  let component: DMenuGroupsComponent;
  let fixture: ComponentFixture<DMenuGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMenuGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMenuGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
