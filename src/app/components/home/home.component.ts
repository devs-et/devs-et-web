import { paths } from '../../models/route.model';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  paths = paths;
  $channels: Observable<any>;

  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.$channels = this.db.collection('channels').valueChanges({idField: 'id'})
  }

}
