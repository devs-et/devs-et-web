import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as $ from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/users/auth.service';

// import { graphql } from '@octokit/graphql';
// import * as auth from '@octokit/auth';
import { UsersCrudService } from '../../../services/users/users-crud.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  $user: Observable<any>

  constructor(
    private router: ActivatedRoute,
    public db: AngularFirestore,
    public auth: AuthService,
    public userCrud: UsersCrudService,
  ) {
    this.$user = this.router.params.pipe(
      $.switchMap(params =>
        this.userCrud.getUserByUsername(params.username)
      ),
      $.tap(console.log)
    )

    this.gql()
  }

  ngOnInit(): void {
  }

  async gql() {
    // const cred = auth.createTokenAuth('2acb7e38a98ba4f7e1eea00e1bf843adef63e32c')

    // const graphqlWithAuth = graphql.defaults({
    //   request: {
    //     hook: cred.hook
    //   }
    // })

    // graphqlWithAuth(`{
    //   user()
    // }`).then(console.log).catch(console.log)
  }

}
