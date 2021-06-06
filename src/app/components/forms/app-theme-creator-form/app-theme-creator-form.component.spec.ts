import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppThemeCreatorFormComponent } from './app-theme-creator-form.component';

describe('AppThemeCreatorFormComponent', () => {
  let component: AppThemeCreatorFormComponent;
  let fixture: ComponentFixture<AppThemeCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppThemeCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppThemeCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
