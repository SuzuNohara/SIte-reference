import { TestBed, inject } from '@angular/core/testing';

import { RcontrolService } from './rcontrol.service';

describe('RcontrolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RcontrolService]
    });
  });

  it('should be created', inject([RcontrolService], (service: RcontrolService) => {
    expect(service).toBeTruthy();
  }));
});
