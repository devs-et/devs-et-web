import { TestBed } from '@angular/core/testing';

import { ChannelCrudService } from './channel-crud.service';

describe('ChannelCrudService', () => {
  let service: ChannelCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
