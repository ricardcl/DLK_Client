import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFormulaireIdComponent } from './section-formulaire-id.component';

describe('SectionFormulaireIdComponent', () => {
  let component: SectionFormulaireIdComponent;
  let fixture: ComponentFixture<SectionFormulaireIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionFormulaireIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFormulaireIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
