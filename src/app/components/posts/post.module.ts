import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreatePostComponent } from './create-post/create-post.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

import { MarkdownModule } from 'ngx-markdown';

import { ListPostsComponent } from './list-posts/list-posts.component';
import { ViewPostComponent } from './view-post/view-post.component';

import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { MatMenuModule } from '@angular/material/menu';
import { PostMenuComponent } from './post-menu/post-menu.component';

@NgModule({
  declarations: [
    CreatePostComponent,
    ListPostsComponent,
    ViewPostComponent,
    PostMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MarkdownModule.forRoot(),
    IonicModule
  ],
  exports: [
    CreatePostComponent,
    ListPostsComponent,
  ],
})
export class PostModule { }
