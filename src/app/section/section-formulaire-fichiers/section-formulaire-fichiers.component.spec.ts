import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFormulaireFichiersComponent } from './section-formulaire-fichiers.component';

describe('SectionFormulaireFichiersComponent', () => {
  let component: SectionFormulaireFichiersComponent;
  let fixture: ComponentFixture<SectionFormulaireFichiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionFormulaireFichiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFormulaireFichiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
