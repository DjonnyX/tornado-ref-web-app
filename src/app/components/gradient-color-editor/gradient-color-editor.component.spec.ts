import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientColorEditorComponent } from './gradient-color-editor.component';

describe('GradientColorEditorComponent', () => {
  let component: GradientColorEditorComponent;
  let fixture: ComponentFixture<GradientColorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradientColorEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientColorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
