import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as $ from 'rxjs/operators';
import * as _ from 'ramda'

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
  ) { }

  getUserByUsername(username: string): Observable<any> {
    return this.db.collection('users', (ref) => {
      return ref.where('githubUser.login', '==', username)
    }).valueChanges().pipe(
      $.map(results => results[0])
    )
  }

  githubUserByUsername(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}`)
  }

  githubUserByUid(uid: string): Observable<any> {
    return this.http.get(`https://api.github.com/user/${uid}`)
  }

  updateUser(uid: string, data: any) {
    this.db.collection('users').doc(uid).set(data, {
      merge: true
    })
  }

  refreshUser(user: any) {
    this.mergeGithubData(user).subscribe(data => {
      this.updateUser(user.uid, data)
    })
  }

  getUser(uid: string): Observable<any> {
    if (uid !== '') {
      return this.db.collection('users').doc(uid).valueChanges()
    } else {
      throw new Error(`Invalid UID "${uid}"`)
    }
  }

  mergeGithubData(data: any): Observable<any> {

    const uid = data.githubUid || data.providerData[0].uid

    return this.githubUserByUid(uid).pipe(
      $.map(user => {
        return {
          ...data,
          githubUser: user,
          username: user.login,
          displayName: user.name,
          githubUid: uid,
        }
      })
    )
  }

  follow(follower: string, followed: string) {
    this.db.doc(`users/${followed}`).get().subscribe(doc => {
      const followedData = doc.data()

      const followers = followedData.followers || []

      this.db.doc(`users/${followed}`).update({
        followers: _.uniq(_.append(follower, followers))
      })

      this.db.doc(`users/${follower}`).get().subscribe(userDoc => {
        const user = userDoc.data()

        const usersFolowing = user.usersFollowing || []

        this.db.doc(`users/${follower}`).update({
          usersFollowing: _.uniq(_.append({
            user: followed,
            createdAt: new Date().getTime()
          }, usersFolowing))
        })
      })
    })
  }

  unfollow(follower: string, followed: string) {
    this.db.doc(`users/${followed}`).get().subscribe(doc => {
      const channel = doc.data()

      const followers = channel.followers || []

      this.db.doc(`users/${followed}`).update({
        followers: _.uniq(_.difference([followed], followers))
      })

      this.db.doc(`users/${followed}`).get().subscribe(userDoc => {
        const user = userDoc.data()

        const usersFolowing = user.usersFollowing || []
        const found = _.find(_.propEq('user', followed), usersFolowing)

        this.db.doc(`users/${followed}`).update({
          usersFollowing: _.difference([found], usersFolowing)
        })
      })
    })
  }

  isFollowing(follower: string, user: any): boolean {
    const followers = user.followers || []
    return followers.indexOf(follower) >= 0
  }
}
