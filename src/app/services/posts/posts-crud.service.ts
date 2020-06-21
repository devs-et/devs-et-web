import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AuthService } from '../users/auth.service';

import * as moment from 'moment';
import * as $ from 'rxjs/operators';
import * as _ from 'ramda';
import { Observable } from 'rxjs';

interface Vote {
  uid: string
  direction: 'up' | 'down'
  value: number
  createdAt: number
}

type PostCrudActions =
  'upvote' | 'remove-upvote' | 'downvote' | 'remove-downvote' |
  'report' | 'remove-report' | 'edit' | 'delete'

const VOTE_VALUE = 3600*3 // 3 hours

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
            switch (direction) {
              case 'up': {
                if (uid !== postId) {
                  if (this.hasVoted(uid, post.votes)) {
                    //*check vote type
                    const vote = _.find(
                      _.propEq('uid', uid),
                      post.votes
                    ) as any

                    if (vote.direction === 'up') {

                      const votes = _.difference([vote], post.votes) || []

                      this.db.doc(`posts/${postId}`).update({
                        votes
                      })
                      //?maybe reset the vote?
                    }
                  } else {
                    this.registerVote(uid, postId, 'up', post)
                  }
                }
              }
              case 'down': {

              }

              default:
                break;
            }
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

    const vote: Vote = {
      uid,
      direction,
      value: VOTE_VALUE,
      createdAt: new Date().getTime()
    }

    const votes = _.append(vote, post.votes)

    this.db.doc(`posts/${postId}`).update({
      votes
    })

  }

  async upVoteDELETEME(id: string) {

    this.auth.auth.authState.subscribe(user => {
      if (user) {
        this.db.collection('posts').doc(id).get().subscribe(doc => {
          const data = doc.data()
          const value = 3600*3 // 3 hours

          // if (data.uid === user.uid) {
          if (data.uid !== user.uid) {
            return false
          } else if (this.hasVoted(user.uid, data.votes)) {
            console.log('already voted')
            console.log('remove vote')

            const vote = _.find(
              _.propEq('uid', user.uid),
              data.votes
            ) as any

            const votes = _.difference([vote], data.votes) || []

            data.points = (data.points || 2) - 1
            data.trend = (data.trend || data.createdAt) - vote.value || 0
            data.votes = votes

            this.db.doc(`posts/${id}`).set(data, { merge: true })
          } else {
            console.log('adding vote')
            data.points = (data.points || 1) + 1
            data.trend = (data.trend || data.createdAt) + value
            data.votes = _.append({
              uid: user.uid,
              value,
            }, (data.votes as any[] || []))
          }

          this.db.doc(`posts/${id}`).set(data, { merge: true })

        })
      } else {
        this.auth.dialog.open({
          desc: "You need to sign in to vote"
        })
      }
    })
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

  refreshPost(id: string) {
    console.log('refresh', id)
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

        switch (action) {
          case 'delete': return uid === post.uid
          case 'edit': return uid === post.uid
          case 'upvote': return uid !== post.uid
          case 'downvote': return uid !== post.uid
          case 'remove-upvote': return uid !== post.uid
          case 'remove-downvote': return uid !== post.uid
          case 'report': return uid !== post.uid
          default: return false
        }
      })
    )
  }
}
