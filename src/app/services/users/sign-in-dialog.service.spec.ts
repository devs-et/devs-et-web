import { TestBed } from '@angular/core/testing';

import { SignInDialogService } from './sign-in-dialog.service';

describe('SignInDialogService', () => {
  let service: SignInDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
