import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/users/auth.service';
import { PostsCrudService } from '../../../services/posts/posts-crud.service';
import { DeleteDialogService } from '../../../services/posts/delete-dialog.service';

@Component({
  selector: 'post-menu',
  templateUrl: './post-menu.component.html',
  styleUrls: ['./post-menu.component.scss']
})
export class PostMenuComponent implements OnInit {
  @Input('post') post
  @Input('position') position: 'before' | 'after'

  constructor(
    public auth: AuthService,
    public crud: PostsCrudService,
    public deleteDialog: DeleteDialogService,
  ) { }

  ngOnInit(): void {
  }
}
