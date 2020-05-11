import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { MarkdownService, MarkdownModule } from 'ngx-markdown';

import { toDashedString } from '../../../lib/dashed-string';
import { paths } from './../../../models/route.model';

import * as SimpleMDE from 'simplemde';

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
  form!: FormGroup;
  post!: Post;

  simplemde: any;

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private router: Router,
    private md: MarkdownService,
  ) {
    this.post = {} as Post

    this.simplemde = new SimpleMDE({
      element: document.getElementById('simplemde')
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      content: new FormControl(this.post.content, [
        Validators.required,
        Validators.minLength(10),
      ]),
    })
  }

  async submitHandler() {
    const formValue = this.form.value

    try {
      const now = new Date().getTime()

      await this.db.collection('posts').add({
        ...formValue,
        points: 1,
        createdAt: now,
        updatedAt: now,
      }).then(doc => {

        formValue.content = this.md.compile(formValue.content)

        this.router.navigate([
          paths.posts.view,
          toDashedString(formValue.title),
          doc.id
        ])
      })
    } catch(err) {
      console.log(err)
    }
  }

  parseMarkdown(md: string) {
    console.log(md)
    console.log(this.md.compile(md))
  }

  get title() {
    return this.form.get('title')
  }

  get content() {
    return this.form.get('content')
  }
}
