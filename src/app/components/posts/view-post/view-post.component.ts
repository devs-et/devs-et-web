import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import * as $ from 'rxjs/operators';
import { PostsCrudService } from '../../../services/posts/posts-crud.service';
import { AuthService } from '../../../services/users/auth.service';

@Component({
  selector: 'view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  post$!: Observable<any>

  id: string;

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    public crud: PostsCrudService,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      $.switchMap((params: any) => {
        this.id = params.get('id')

        this.crud.refreshPost(this.id)
        return this.db.doc(`posts/${this.id}`).valueChanges().pipe(
          $.map((doc: any) => {
            const id = this.id

            return {
              ...doc,
              id
            }
          })
        )
      })
    )
  }

}
