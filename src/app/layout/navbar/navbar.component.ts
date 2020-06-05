import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SignInDialogComponent } from '../../components/users/sign-in-dialog/sign-in-dialog.component';
import {
  MatDialog, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { AuthService } from '../../services/users/auth.service';
import { SignInDialogService } from '../../services/users/sign-in-dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public signInDialog: SignInDialogService,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  showSignInDialog() {
    this.signInDialog.open()
  }

}
