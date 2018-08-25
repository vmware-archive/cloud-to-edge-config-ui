import { TestBed, inject } from '@angular/core/testing';

import { HttpConfigService } from './http-config.service';

describe('HttpConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpConfigService]
    });
  });

  it('should be created', inject([HttpConfigService], (service: HttpConfigService) => {
    expect(service).toBeTruthy();
  }));
});
