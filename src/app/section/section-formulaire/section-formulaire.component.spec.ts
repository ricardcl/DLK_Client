import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFormulaireComponent } from './section-formulaire.component';

describe('SectionFormulaireComponent', () => {
  let component: SectionFormulaireComponent;
  let fixture: ComponentFixture<SectionFormulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionFormulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
