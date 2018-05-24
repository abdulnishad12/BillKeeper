import { TestBed, inject } from '@angular/core/testing';

import { TariffsService } from './tariffs.service';

describe('TariffsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TariffsService]
    });
  });

  it('should be created', inject([TariffsService], (service: TariffsService) => {
    expect(service).toBeTruthy();
  }));
});
