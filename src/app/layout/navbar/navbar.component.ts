import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SignInDialogComponent } from '../../components/users/sign-in-dialog/sign-in-dialog.component';
import {
  MatDialog, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { AuthService } from '../../services/users/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  showSignInDialog() {

    const dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '400px',
      maxWidth: '90%',
      maxHeight: '90%',
      // data: {name: this.name, animal: this.animal}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }

}
