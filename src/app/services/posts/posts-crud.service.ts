import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AuthService } from '../users/auth.service';

import * as moment from 'moment';
import * as $ from 'rxjs/operators';
import * as _ from 'ramda';
import { Observable } from 'rxjs';

interface Vote {
  uid: string
  direction: 'up' | 'down' | 'reset'
  value: number
  createdAt: number
}

type PostCrudActions =
  'upvote' | 'remove-upvote' | 'downvote' | 'remove-downvote' |
  'reset-vote' | 'report' | 'remove-report' | 'edit' | 'delete'

const VOTE_VALUE = 3600*6 // 6 hours

@Injectable({
  providedIn: 'root'
})
export class PostsCrudService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
  ) {

  }

  vote(
    id: string,
    direction: 'up' | 'down' | 'reset' = 'up',
  ) {
    this.auth.$uid.subscribe(uid => {
      if (uid) {
        this.db.doc(`posts/${id}`).get().subscribe(doc => {
          const post = doc.data()
          const postId = doc.id

          if (doc.exists) {
            this.registerVote(uid, postId, direction, post)
          }
        })
      } else {
        this.auth.dialog.open({
          desc: `Please sign in to vote`
        })
      }
    })
  }

  private registerVote(
    uid: string,
    postId: string,
    direction: 'up' | 'down' | 'reset',
    post: any
  ) {
    const multiplier = direction === 'down' ? -1 : 1

    const vote: Vote = {
      uid,
      direction,
      value: VOTE_VALUE * multiplier,
      createdAt: new Date().getTime()
    }

    if (uid !== post.uid) {
      const foundVote = _.find(
        _.propEq('uid', uid),
        post.votes || []
      ) as any

      if (
        (foundVote && foundVote.direction === direction)
        || direction === 'reset'
      ) {
        const votes = _.difference([foundVote], post.votes) || []
        const points = _.filter(_.propEq('direction', 'up'), votes).length
          - _.filter(_.propEq('direction', 'down'), votes).length + 1
        const trend = post.createdAt + (VOTE_VALUE * points)

        this.db.doc(`posts/${postId}`).update({
          trend,
          points,
          votes,
        })
      } else {

        const resetVotes = foundVote
          ? _.difference([foundVote], post.votes) || []
          : post.votes
        const votes = _.append(vote, resetVotes)
        const points = _.filter(_.propEq('direction', 'up'), votes).length
          - _.filter(_.propEq('direction', 'down'), votes).length + 1
        const trend = post.createdAt + (VOTE_VALUE * points)

        this.db.doc(`posts/${postId}`).update({
          trend,
          points,
          votes
        })
      }
    }
  }

  hasVoted(uid: string, votes: any[]): boolean {
    return !votes
      ? false
      : _.find(
        _.propEq('uid', uid),
        votes
      )
        ? true
        : false
  }

  getVoteDirection(uid: string, votes: any[]): 'up' | 'down' | null {
    const found = _.find(
      _.propEq('uid', uid),
      votes || []
    )

    return found ? found.direction : null
  }

  refreshPost(id: string) {
    this.db.doc(`posts/${id}`).get().subscribe(doc => {
      const post = doc.data()


      this.db.doc(`users/${post.uid}`).get().subscribe(doc => {
        const user = doc.data()

        if (doc.exists) {
          const postUser = {
            displayName: user.displayName,
            uid: user.uid,
            username: user.githubUser?.login || user.uid
          }

          console.log(postUser)
          this.db.doc(`posts/${id}`).update({
            user: postUser
          })
        }
      })
    })
  }

  canDo(post, action: PostCrudActions): Observable<boolean> {
    return this.auth.$uid.pipe(
      $.map(uid => {
        if (!uid) {
          return false
        }

        const dir = this.getVoteDirection(uid, post.votes)

        switch (action) {
          case 'delete': return uid === post.uid
          case 'edit': return uid === post.uid
          case 'upvote': return uid !== post.uid && dir === 'up'
          case 'downvote': return uid !== post.uid && dir !== 'down'
          case 'reset-vote': return uid !== post.uid && dir !== null
          case 'remove-upvote': return uid !== post.uid  && dir === 'up'
          case 'remove-downvote': return uid !== post.uid && dir === 'down'
          case 'report': return uid !== post.uid
          default: return false
        }
      })
    )
  }

  async delete(uid: string) {
    return this.db.doc(`posts/${uid}`).delete()
  }
}
