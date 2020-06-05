import { DashedStringPipe } from './../../../pipes/dashed-string.pipe';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { paths } from '../../../models/route.model';
import { AuthService } from 'app/services/users/auth.service';

@Component({
  selector: 'list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
  providers: [
    DashedStringPipe
  ]
})
export class ListPostsComponent implements OnInit {

  posts$!: Observable<any[]>;
  paths = paths;

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.db.collection('posts').valueChanges({ idField: 'id' })
  }

}
