import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { paths } from './../../../models/route.model';

@Component({
  selector: 'list-channels',
  templateUrl: './list-channels.component.html',
  styleUrls: ['./list-channels.component.scss']
})
export class ListChannelsComponent implements OnInit {
  channels$!: Observable<any>

  paths = paths;

  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.channels$ = this.db.collection('channels').valueChanges({
      idField: 'id'
    })
  }
}
