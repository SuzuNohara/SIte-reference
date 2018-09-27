import { TestBed, inject } from '@angular/core/testing';

import { AltaServiceService } from './alta-service.service';

describe('AltaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AltaServiceService]
    });
  });

  it('should be created', inject([AltaServiceService], (service: AltaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
