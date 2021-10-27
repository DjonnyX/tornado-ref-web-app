import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifCreatorFormComponent } from './tarif-creator-form.component';

describe('TarifCreatorFormComponent', () => {
  let component: TarifCreatorFormComponent;
  let fixture: ComponentFixture<TarifCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
