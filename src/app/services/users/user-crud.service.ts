import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'firebase';

import * as $ from 'rxjs/operators';

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

  getUser(uid: string): Observable<any> {
    if (uid !== '') {
      return this.db.collection('users').doc(uid).valueChanges()
    } else {
      throw new Error(`Invalid UID "${uid}"`)
    }
  }

  getUserData(user: User): Observable<any> {
    const data = user.toJSON() as any

    const uid = data.providerData[0].uid

    return this.githubUserByUid(uid).pipe(
      $.map(user => {
        return {
          ...data,
          githubUser: user,
        }
      })
    )
  }
}
