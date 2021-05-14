import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsEditorComponent } from './backups-editor.component';

describe('BackupsEditorComponent', () => {
  let component: BackupsEditorComponent;
  let fixture: ComponentFixture<BackupsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackupsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
