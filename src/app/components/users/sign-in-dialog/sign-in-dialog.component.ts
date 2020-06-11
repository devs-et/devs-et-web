import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../services/users/auth.service';

@Component({
  selector: 'sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss']
})
export class SignInDialogComponent implements OnInit {
  loading: boolean = false

  constructor(
    public dialogRef: MatDialogRef<SignInDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  signInWithGithub() {
    this.loading = true
    this.auth.signInWithGithub().finally(() => this.loading = false)
  }
}
