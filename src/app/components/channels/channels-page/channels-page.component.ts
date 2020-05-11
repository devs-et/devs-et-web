import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { paths } from './../../../models/route.model';

@Component({
  selector: 'channels-page',
  templateUrl: './channels-page.component.html',
  styleUrls: ['./channels-page.component.scss']
})
export class ChannelsPageComponent implements OnInit {

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