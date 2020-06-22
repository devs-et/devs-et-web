import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

import { MarkdownService, MarkdownModule } from 'ngx-markdown';

import { toDashedString } from '../../../lib/dashed-string';
import { paths } from './../../../models/route.model';

import * as $ from 'rxjs/operators';

import * as SimpleMDE from 'simplemde';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/users/auth.service';

interface Post {
  title: string;
  content: string;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  $channel: Observable<any>
  channelId: string;
  post: Post;
  form: any;
  posting: boolean = false;

  contentEditor: any;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private md: MarkdownService,
    private route: ActivatedRoute,
    public auth: AuthService,
  ) {
    this.post = {} as Post

    this.form = {
      valid: false,
      active: true,
      title: '',
      content: '',
      errors: {
        form: [],
        title: [],
        content: [],
      }
    }
  }

  ngOnInit(): void {

    this.$channel = this.route.paramMap.pipe(
      $.switchMap(params => {
        this.channelId = params.get('channel-id')

        return this.db.doc(`channels/${this.channelId}`).valueChanges()
      })
    )

    this.contentEditor = new SimpleMDE({
      element: document.getElementById('add-post-editor'),
      placeholder: "Write your post here...",
      status: false,
      promptURLs: true,
      tabSize: 4,
      hideIcons: [
        'guide',
        'preview',
        'fullscreen',
        'side-by-side',
        'quote'
      ],
      showIcons: [
        'code',
      ],
      parsingConfig: {
        // allowAtxHeaderWithoutSpace: true
      },
    })

    this.contentEditor.codemirror.on('change', () => {
      this.validateContent()

      this.form.content = this.contentEditor.value().trim()
    })
  }

  validateContent() {
    const value = this.contentEditor.value().trim()

    this.form.errors.content = value.length === 0
      ? ['Please write some content']
      : (
        value.length < 10
          ? ['The content is too short']
          : []
      )

    this.validateForm()
  }

  validateTitle() {
    const value = this.form.title.trim()

    this.form.errors.title = value.length === 0
      ? ['Please add a title']
      : (
        value.length < 5
          ? ['The title is too short']
          : []
      )

    this.validateForm()
  }

  validateForm() {
    this.form.valid = this.form.title.trim().length > 5
      && this.contentEditor.value().trim().length > 10
  }

  async submitHandler() {

    this.posting = true

    this.auth.auth.authState.subscribe(user => {
      if (user) {
        this.$channel.subscribe(channel => {
          if (channel) {
            this.savePost({
              uid: user.uid,
              displayName: user.displayName || user.email,
            }, {
              ...channel,
              id: this.channelId,
            })
          }
        })
      } else {
        this.auth.dialog.open({
          desc: 'Please sign in to add a post'
        })
      }

      this.posting = false
    })
  }

  async savePost(user, channel) {

    const formValue = {
      title: this.form.title,
      content: this.form.content,
    }

    this.form.active = false

    if (!channel.approved) {
      return false
    }

    try {
      const now = new Date().getTime()

      const post = {
        ...formValue,
        points: 1,
        votes: [],
        channel: channel,
        channelId: channel.id,
        uid: user.uid,
        user: user,
        trend: moment().add(7, 'days').valueOf(),
        createdAt: now,
        updatedAt: now,
      }

      await this.db.collection('posts').add(post).then(doc => {

        formValue.content = this.md.compile(formValue.content)

        this.router.navigate([
          paths.posts.view,
          toDashedString(formValue.title),
          doc.id
        ])
      })
    } catch (err) {
      this.form.active = true
      console.log(err)
    }
  }

  parseMarkdown(md: string) {
    console.log(md)
    console.log(this.md.compile(md))
  }
}
