import { TestBed } from '@angular/core/testing';

import { ChargerFormulaireService } from './charger-formulaire.service';

describe('ChargerFormulaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargerFormulaireService = TestBed.get(ChargerFormulaireService);
    expect(service).toBeTruthy();
  });
});
