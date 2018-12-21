import { TestBed, inject } from '@angular/core/testing';

import { AutomatasService } from './automatas.service';

describe('AutomatasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomatasService]
    });
  });

  it('should be created', inject([AutomatasService], (service: AutomatasService) => {
    expect(service).toBeTruthy();
  }));
});
