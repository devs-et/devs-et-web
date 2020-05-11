
import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ViewPostComponent } from './components/posts/view-post/view-post.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { ViewChannelComponent } from './components/channels/view-channel/view-channel.component';
import { ChannelsPageComponent } from './components/channels/channels-page/channels-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateChannelComponent } from './components/channels/create-channel/create-channel.component';

import { paths } from './models/route.model';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: paths.posts.create,
    component: CreatePostComponent,
  },
  {
    path: `${paths.posts.view}/:name/:id`,
    component: ViewPostComponent,
  },
  {
    path: `${paths.channels.list}`,
    component: ChannelsPageComponent,
  },
  {
    path: paths.channels.create,
    component: CreateChannelComponent,
  },
  {
    path: `${paths.channels.view}/:id`,
    component: ViewChannelComponent,
  },


  // WARNING: keep this at the end
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

