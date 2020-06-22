import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/posts/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {
  dialogRef: MatDialogRef<DeleteDialogComponent>

  constructor(
    public dialog: MatDialog,
  ) { }

  open(data: any = {}) {

    this.dialogRef?.close()

    this.dialogRef = this.dialog.open(DeleteDialogComponent, {
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
