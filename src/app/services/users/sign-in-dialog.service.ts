import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInDialogComponent } from 'app/components/users/sign-in-dialog/sign-in-dialog.component';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class SignInDialogService {
  dialogRef: MatDialogRef<SignInDialogComponent>

  constructor(
    public dialog: MatDialog,
  ) { }

  open(data: any = {}) {

    this.dialogRef?.close()

    this.dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '400px',
      maxWidth: '90%',
      maxHeight: '90%',
      data,
    })

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  close() {
    this.dialogRef.close()
  }

}
