import { paths } from '../../models/route.model';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import * as $ from 'rxjs/operators';
import * as _ from 'ramda';
import { ChannelCrudService } from '../../channels/channel-crud.service';

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
    public channelCrud: ChannelCrudService,
  ) { }

  ngOnInit(): void {
    this.$channels = this.channelCrud.fetchAll()
  }

}
