import { TestBed } from '@angular/core/testing';

import { DeleteDialogService } from './delete-dialog.service';

describe('DeleteDialogService', () => {
  let service: DeleteDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
