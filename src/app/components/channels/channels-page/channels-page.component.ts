import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as $ from 'rxjs/operators';

import { paths } from './../../../models/route.model';
import { CreateChannelDialogService } from '../../../services/channels/create-channel-dialog.service';
import { ChannelCrudService } from '../../../channels/channel-crud.service';
import { AuthService } from '../../../services/users/auth.service';

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
    public createChannelDialog: CreateChannelDialogService,
    public channelCrud: ChannelCrudService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.channels$ = this.channelCrud.fetchAll()
  }
}
