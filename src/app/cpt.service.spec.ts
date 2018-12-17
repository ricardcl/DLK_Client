import { TestBed } from '@angular/core/testing';

import { CptService } from './cpt.service';

describe('CptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CptService = TestBed.get(CptService);
    expect(service).toBeTruthy();
  });
});
