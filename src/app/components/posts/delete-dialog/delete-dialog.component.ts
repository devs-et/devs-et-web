import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'app/services/users/auth.service';
import { PostsCrudService } from '../../../services/posts/posts-crud.service';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public auth: AuthService,
    public postCrud: PostsCrudService,
  ) {
  }

  ngOnInit(): void {
  }

  delete(uid: string) {
    this.postCrud.delete(uid).then(() => {
      this.dialogRef.close()
    })
  }

}
