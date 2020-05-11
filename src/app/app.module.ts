import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { PostModule } from './components/posts/post.module';
import { LayoutModule } from './layout/layout.module';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { MarkdownModule } from 'ngx-markdown';

import { environment } from './../environments/environment';
import { ChannelsModule } from './components/channels/channels.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    PostModule,
    MatButtonModule,
    MatListModule,
    ChannelsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
