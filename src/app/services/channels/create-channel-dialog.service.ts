import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/components/posts/delete-dialog/delete-dialog.component';
import { CreateChannelComponent } from '../../components/channels/create-channel/create-channel.component';

@Injectable({
  providedIn: 'root'
})
export class CreateChannelDialogService {
  dialogRef: MatDialogRef<CreateChannelComponent>

  constructor(
    public dialog: MatDialog,
  ) { }

  open(data: any = {}) {

    this.dialogRef?.close()

    this.dialogRef = this.dialog.open(CreateChannelComponent, {
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
