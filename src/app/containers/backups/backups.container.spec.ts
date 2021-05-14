import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsContainer } from './backups.container';

describe('BackupsContainer', () => {
  let component: BackupsContainer;
  let fixture: ComponentFixture<BackupsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackupsContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
