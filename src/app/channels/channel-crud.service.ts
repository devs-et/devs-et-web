import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { toDashedString } from '../lib/dashed-string';
import { AuthService } from '../services/users/auth.service';
import { CreateChannelDialogService } from '../services/channels/create-channel-dialog.service';

import { Observable } from 'rxjs'
import * as $ from 'rxjs/operators'
import * as _ from 'ramda'

interface Channel {
  id: string,
  name: string,
  description: string,
  createdBy: string,
  createdAt: number,
}

@Injectable({
  providedIn: 'root'
})
export class ChannelCrudService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private dialog: CreateChannelDialogService,
  ) { }

  create(name: any, description) {
    this.auth.$uid.subscribe(uid => {
      if (uid) {
        const channel = {
          name,
          description,
          id: toDashedString(name),
          createdAt: new Date().getTime(),
          createdBy: uid,
          approved: false,
        } as Channel

        this.db.doc(`channels/${channel.id}`).set(channel).then(() => {
          this.dialog.close()
        })
      }
    })
  }

  fetchAll(): Observable<any> {
    return this.db.collection('channels').valueChanges({
      idField: 'id'
    }).pipe(
      $.map((channels: any[]) => channels.filter(channel => channel.approved))
    )
  }

  follow(uid: string, id: string) {
    this.db.doc(`channels/${id}`).get().subscribe(doc => {
      const channel = doc.data()

      const followers = channel.followers || []

      this.db.doc(`channels/${id}`).update({
        followers: _.uniq(_.append(uid, followers))
      })

      this.db.doc(`users/${uid}`).get().subscribe(userDoc => {
        const user = userDoc.data()

        const channelsFolowing = user.channelsFollowing || []

        this.db.doc(`users/${uid}`).update({
          channelsFollowing: _.uniq(_.append({
            channel: id,
            createdAt: new Date().getTime()
          }, channelsFolowing))
        })
      })
    })
  }

  unfollow(uid: string, id: string) {
    this.db.doc(`channels/${id}`).get().subscribe(doc => {
      const channel = doc.data()

      const followers = channel.followers || []

      this.db.doc(`channels/${id}`).update({
        followers: _.uniq(_.difference([uid], followers))
      })

      this.db.doc(`users/${uid}`).get().subscribe(userDoc => {
        const user = userDoc.data()

        const channelsFolowing = user.channelsFollowing || []
        const found = _.find(_.propEq('channel', id), channelsFolowing)

        this.db.doc(`users/${uid}`).update({
          channelsFollowing: _.difference([found], channelsFolowing)
        })
      })
    })
  }

  isFollowing(uid: string, channel: any): boolean {
    const followers = channel.followers || []
    console.log(followers.indexOf(uid))
    return followers.indexOf(uid) >= 0
  }
}
