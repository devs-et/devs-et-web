import { DashedStringPipe } from './../../../pipes/dashed-string.pipe';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { paths } from '../../../models/route.model';
import { AuthService } from 'app/services/users/auth.service';
import { PostsCrudService } from '../../../services/posts/posts-crud.service';

@Component({
  selector: 'list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
  providers: [
    DashedStringPipe
  ]
})
export class ListPostsComponent implements OnInit {
  @Input('channel-id') channelId: string;

  posts$!: Observable<any[]>;
  paths = paths;

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
    public crud: PostsCrudService,
  ) {
  }

  ngOnInit(): void {
    const query = (ref) => {
      return (this.channelId
        ? ref.where('channelId', '==', this.channelId)
        : ref
      ).orderBy('trend', 'desc').orderBy('points', 'desc')

    }

    this.posts$ = this.db.collection('posts', query)
      .valueChanges({ idField: 'id' })
  }
}
