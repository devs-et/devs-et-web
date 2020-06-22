import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import * as $ from 'rxjs/operators';
import { AuthService } from '../../../services/users/auth.service';
import { ChannelCrudService } from '../../../channels/channel-crud.service';

@Component({
  selector: 'view-channel',
  templateUrl: './view-channel.component.html',
  styleUrls: ['./view-channel.component.scss']
})
export class ViewChannelComponent implements OnInit {
  $channel!: Observable<any>

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    public auth: AuthService,
    public channelCrud: ChannelCrudService,
  ) { }

  ngOnInit(): void {
     this.$channel = this.route.paramMap.pipe(
      $.switchMap((params: any) => {
        const id = params.get('id')

        return this.db.doc(`channels/${id}`).valueChanges().pipe(
          $.map((channel: object) => {
            return {
              ...channel,
              id
            }
          })
        )
      })
    )
  }
}
