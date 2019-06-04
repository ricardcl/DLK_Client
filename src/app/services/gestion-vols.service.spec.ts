import { TestBed } from '@angular/core/testing';

import { GestionVolsService } from './gestion-vols.service';

describe('GestionVolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionVolsService = TestBed.get(GestionVolsService);
    expect(service).toBeTruthy();
  });
});
