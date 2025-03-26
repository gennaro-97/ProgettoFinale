import { TestBed } from '@angular/core/testing';

import { DatiutentiService } from './datiutenti.service';

describe('DatiutentiService', () => {
  let service: DatiutentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatiutentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
