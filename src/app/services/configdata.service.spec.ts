import { TestBed, inject } from '@angular/core/testing';

import { ConfigdataService } from './configdata.service';

describe('ConfigdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigdataService]
    });
  });

  it('should be created', inject([ConfigdataService], (service: ConfigdataService) => {
    expect(service).toBeTruthy();
  }));
});
