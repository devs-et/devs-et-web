import { TestBed } from '@angular/core/testing';

import { CreateChannelDialogService } from './create-channel-dialog.service';

describe('CreateChannelDialogService', () => {
  let service: CreateChannelDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateChannelDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
